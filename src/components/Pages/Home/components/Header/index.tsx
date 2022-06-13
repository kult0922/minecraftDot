import Link from "next/link";
import { useState } from "react";
import LanguageSwitch from "src/components/Common/LanguageSwitch";
import { useLocale } from "src/i18n/useLocale";
import HelpModal from "./HelpModal";

const Header = () => {
  const { t } = useLocale();
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsHelpModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between my-3">
        <div className="text-3xl ml-3">Minecraft Dot</div>
        <div className="flex">
          <button onClick={handleModalOpen} className="mr-3">
            {t.HELP}
          </button>
          <div>
            <LanguageSwitch path="/" />
          </div>
        </div>
      </div>
      <HelpModal isModalOpen={isHelpModalOpen} setIsModalOpen={setIsHelpModalOpen} />
    </>
  );
};

export default Header;
