import Link from "next/link";
import { useLocale } from "src/i18n/useLocale";

const CommandHelpComponent = () => {
  const { t } = useLocale();
  return (
    <>
      <div className="m-4">
        <div className="text-4xl mb-4">{t.HOW_TO_RUN_COMMAND}</div>
        <div>{t.COMMAND1}</div>
        <div>{t.COMMAND2}</div>

        <div className="mt-2">
          <Link href="/command-help/java">
            <a className="underline text-decoration">{t.COMMAND_JAVA_LINK}</a>
          </Link>
        </div>
        <div className="mt-2">
          <Link href="/command-help/bedrock">
            <a className="underline text-decoration">{t.COMMAND_BEDROCK_PC_LINK}</a>
          </Link>
        </div>
        <div className="mt-2">
          <Link href="/command-help/bedrock-iphone">
            <a className="underline text-decoration">{t.COMMAND_BEDROCK_IPHONE_LINK}</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CommandHelpComponent;
