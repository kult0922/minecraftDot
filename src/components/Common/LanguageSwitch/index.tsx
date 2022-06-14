import Link from "next/link";
import { useState } from "react";
import { useLocale } from "src/i18n/useLocale";
import OutsideClickHandler from "react-outside-click-handler";

interface Props {
  path: string;
}

const LanguageSwitch = ({ path }: Props) => {
  const { t, locale } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    console.log("close");
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="">
        <button onClick={handleMenuOpen} className="border-2 px-2 py-1 rounded">
          <div className="flex whitespace-nowrap">
            <div className="material-symbols-outlined text-md mr-1">language</div>
            {locale === "ja" ? <div>日本語</div> : <div>English</div>}
          </div>
        </button>
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          handleMenuClose();
        }}
      >
        <div className="relative">
          {isMenuOpen && (
            <div className="absolute">
              <div className="bg-neutral-900 hover:bg-m-green w-24 p-1 text-right border-b border-neutral-600">
                <Link href={path} locale="en" passHref>
                  <a onClick={handleMenuClose}>English</a>
                </Link>
              </div>
              <div className="bg-neutral-900 hover:bg-m-green w-24 p-1 text-right">
                <Link href={path} locale="ja" passHref>
                  <a onClick={handleMenuClose}>日本語</a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default LanguageSwitch;
