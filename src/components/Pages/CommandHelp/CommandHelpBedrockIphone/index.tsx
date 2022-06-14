import Link from "next/link";
import LanguageSwitch from "src/components/Common/LanguageSwitch";
import { useLocale } from "src/i18n/useLocale";

const CommandHelpBedrockIphoneComponent = () => {
  const { t } = useLocale();
  return (
    <>
      <div className="m-4">
        <div className="flex justify-between">
          <div className="sm:text-4xl text-xl mb-4">{t.BEDROCK_IPHONE_COMMAND_TITLE}</div>
          <div>
            <LanguageSwitch path="/command-help/bedrock-iphone/" />
          </div>
        </div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step1. {t.BEDROCK_IPHONE_COMMAND_SECTION1}</div>
        <div>{t.BEDROCK_IPHONE_COMMAND_TEXT1}</div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step2. {t.BEDROCK_IPHONE_COMMAND_SECTION2}</div>
        <div>{t.BEDROCK_IPHONE_COMMAND_TEXT2}</div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step3. {t.BEDROCK_IPHONE_COMMAND_SECTION3}</div>
        <div>{t.BEDROCK_IPHONE_COMMAND_TEXT3}</div>
        <div className="mt-3 p-3 bg-neutral-900">
          <ul>
            <li>
              <span className="caret">📂 development_behavior_pack</span>
              <ul className=" px-8 py-1">
                <li>
                  <span className="caret">└ 📂 dot_pack</span>
                  <ul className=" px-8 py-1">
                    <li>└ manifest.json</li>
                    <li>
                      <span className="caret">└ 📂 functions</span>
                      <ul className=" px-8 py-1">
                        <li>└ cmd1.mcfunction</li>
                        <li>└ cmd2.mcfunction</li>
                        <li>└ cmd3.mcfunction</li>
                        <li>└ ...</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step4. {t.BEDROCK_IPHONE_COMMAND_SECTION4}</div>
        <div>{t.BEDROCK_IPHONE_COMMAND_TEXT4}</div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step5. {t.BEDROCK_IPHONE_COMMAND_SECTION5}</div>
        <div>{t.BEDROCK_IPHONE_COMMAND_TEXT5}</div>
      </div>
    </>
  );
};

export default CommandHelpBedrockIphoneComponent;
