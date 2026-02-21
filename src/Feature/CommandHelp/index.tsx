import { Link } from "@tanstack/react-router";
import LanguageSwitch from "src/components/LanguageSwitch";
import { useLocale } from "src/hooks/useLocale";

const CommandHelpComponent = () => {
  const { t } = useLocale();
  return (
    <>
      <div className="m-4">
        <div className="flex justify-between">
          <div className="sm:text-4xl text-xl mb-4">{t.HOW_TO_RUN_COMMAND}</div>
          <div>
            <LanguageSwitch />
          </div>
        </div>
        <div>{t.COMMAND1}</div>
        <div>{t.COMMAND2}</div>

        <div className="mt-2">
          <Link to="/command-help/java" className="underline text-decoration">{t.COMMAND_JAVA_LINK}</Link>
        </div>
        <div className="mt-2">
          <Link to="/command-help/bedrock" className="underline text-decoration">{t.COMMAND_BEDROCK_PC_LINK}</Link>
        </div>
        <div className="mt-2">
          <Link to="/command-help/bedrock-iphone" className="underline text-decoration">{t.COMMAND_BEDROCK_IPHONE_LINK}</Link>
        </div>

        <div className="mt-12">
          <Link to="/" className="underline text-decoration">{t.RETURN_HOME}</Link>
        </div>
      </div>
    </>
  );
};

export default CommandHelpComponent;
