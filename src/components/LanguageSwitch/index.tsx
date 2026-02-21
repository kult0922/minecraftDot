import { useState } from "react";
import { useLocaleContext } from "src/context/useLocaleContext";
import OutsideClickHandler from "react-outside-click-handler";

const LanguageSwitch = () => {
  const { locale, setLocale } = useLocaleContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleSetLocale = (newLocale: "en" | "ja") => {
    setLocale(newLocale);
    handleMenuClose();
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
                <button onClick={() => handleSetLocale("en")}>English</button>
              </div>
              <div className="bg-neutral-900 hover:bg-m-green w-24 p-1 text-right">
                <button onClick={() => handleSetLocale("ja")}>日本語</button>
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default LanguageSwitch;
