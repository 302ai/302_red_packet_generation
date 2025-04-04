import { env } from "@/env";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
type ConfigState = {
  // If your tool is listed in the 302 Tool Marketplace, you will receive the tool's toolInfo when a user creates a tool during login.
  toolInfo?: string;
  // The API key for your tool, which is used to authenticate your tool when making requests to the 302 API.
  apiKey?: string;
  // The name of the LLM model you want to use. If you don't specify it, the default model will be used. This parameter can also be obtained after user login.
  modelName?: string;
  // Whether the user is in China. This parameter can also be obtained after user login.
  isChina?: boolean;
  // The share code for your tool, which is used to share your tool with others.
  shareCode?: string;
  // Whether to hide the brand.
  hideBrand?: boolean;
  region?: string;
};

function getApiKeyFromCookie() {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const apiKeyCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("api-key=")
  );
  return apiKeyCookie ? apiKeyCookie.split("=")[1].trim() : null;
}

const defaultApiKey =
  typeof window !== "undefined"
    ? getApiKeyFromCookie() || env.NEXT_PUBLIC_302_API_KEY
    : env.NEXT_PUBLIC_302_API_KEY;
export const appConfigAtom = atomWithStorage<ConfigState>(
  "appConfig",
  {
    apiKey: defaultApiKey,
    modelName: env.NEXT_PUBLIC_DEFAULT_MODEL_NAME,
    isChina: env.NEXT_PUBLIC_IS_CHINA,
    shareCode: "",
    hideBrand: env.NEXT_PUBLIC_HIDE_BRAND,
    region: "1",
  },
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? sessionStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  {
    getOnInit: true,
  }
);
