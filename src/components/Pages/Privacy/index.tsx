import Link from "next/link";
import { useLocale } from "src/hooks/useLocale";

const PrivacyComponent = () => {
  const { t } = useLocale();
  return (
    <>
      <div className="m-4">
        <div className="text-4xl mb-4">Privacy policy</div>
        <div className="text-lg font-semibold">{t.PRIVACY_SECTION1}</div>
        <div className="mb-4">{t.PRIVACY_TEXT1}</div>
        <div className="text-lg font-semibold">{t.PRIVACY_SECTION2}</div>
        <div className="mb-4">{t.PRIVACY_TEXT2}</div>
        <div className="text-lg font-semibold">{t.PRIVACY_SECTION3}</div>
        <div className="mb-4">{t.PRIVACY_TEXT3}</div>

        <Link href="/">
          <a className="underline text-decoration">{t.RETURN_HOME}</a>
        </Link>
      </div>
    </>
  );
};

export default PrivacyComponent;
