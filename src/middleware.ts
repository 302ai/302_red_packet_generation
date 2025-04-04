import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { GLOBAL } from "./constants";
import { routing } from "./i18n/routing";
import { normalizeLanguageCode } from "./utils/language";
import { env } from "@/env";

const handleI18nRouting = createMiddleware(routing);

function setApiKeyToCookie(response: NextResponse, apiKey: string | null) {
  if (!apiKey) return;
  response.cookies.set("api-key", apiKey, {
    httpOnly: false,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}
// Handle URL lang parameter redirection
function handleLangParam(request: NextRequest) {
  const url = request.nextUrl;
  const langParam = url.searchParams.get("lang");

  if (!langParam) return null;

  const normalizedLang = normalizeLanguageCode(langParam);
  if (!GLOBAL.LOCALE.SUPPORTED.includes(normalizedLang)) return null;

  url.searchParams.delete("lang");

  const search = `?${url.searchParams.toString()}`;

  if (url.pathname === "/") {
    url.pathname = `/${normalizedLang}`;
  } else if (!url.pathname.startsWith(`/${normalizedLang}`)) {
    const localeRegex = new RegExp(`^/(${GLOBAL.LOCALE.SUPPORTED.join("|")})`);
    if (localeRegex.test(url.pathname)) {
      url.pathname = url.pathname.replace(localeRegex, `/${normalizedLang}`);
    } else {
      url.pathname = `/${normalizedLang}${url.pathname}`;
    }
  }

  const baseUrl = request.nextUrl.origin;
  return NextResponse.redirect(`${baseUrl}${url.pathname}${search}`);
}

const getApiKey = (request: NextRequest) =>
  request.nextUrl.searchParams.get("token") ||
  request.headers.get("x-api-key") ||
  request.cookies.get("api-key")?.value ||
  env.NEXT_PUBLIC_302_API_KEY;

export default function middleware(request: NextRequest) {
  const apiKey = getApiKey(request);

  const response = NextResponse.next();
  setApiKeyToCookie(response, apiKey!);

  const langRedirect = handleLangParam(request);
  if (langRedirect) {
    setApiKeyToCookie(langRedirect, apiKey!);
    return langRedirect;
  }

  const shouldHandle =
    request.nextUrl.pathname === "/" ||
    new RegExp(`^/(${GLOBAL.LOCALE.SUPPORTED.join("|")})`).test(
      request.nextUrl.pathname
    );

  if (!shouldHandle) return response;

  const i18nResponse = handleI18nRouting(request);
  if (i18nResponse) {
    setApiKeyToCookie(i18nResponse, apiKey!);
    return i18nResponse;
  }

  return response;
}
