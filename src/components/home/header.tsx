import AppLogo from "@/components/global/app-logo";
import { useIsHideBrand } from "@/hooks/global/use-is-hide-brand";
import { useTranslations } from "next-intl";

export default function HomeHeader() {
  const t = useTranslations("home");
  const isHidingBrand = useIsHideBrand();
  return (
    <div className="flex items-center justify-center gap-2">
      {/* {!isHidingBrand && <AppLogo size="mini" height={32} width={32} />} */}
      <h1 className="text-2xl font-bold">{t("header.title")}</h1>
    </div>
  );
}
