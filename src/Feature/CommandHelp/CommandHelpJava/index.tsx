import LanguageSwitch from "src/components/LanguageSwitch";
import { useLocale } from "src/hooks/useLocale";

const CommandHelpJavaComponent = () => {
  const { t } = useLocale();
  return (
    <>
      <div className="m-4">
        <div className="flex justify-between">
          <div className="sm:text-4xl text-xl mb-4">{t.JAVA_COMMAND_TITLE}</div>
          <div>
            <LanguageSwitch />
          </div>
        </div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step1. {t.JAVA_COMMAND_SECTION1}</div>
        <div>{t.JAVA_COMMAND_TEXT1}</div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step2. {t.JAVA_COMMAND_SECTION2}</div>
        <div>{t.JAVA_COMMAND_TEXT2}</div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step3. {t.JAVA_COMMAND_SECTION3}</div>

        <div>{t.JAVA_COMMAND_TEXT3}</div>
        <div className="mt-3 p-3 bg-neutral-900">
          <ul>
            <span className="caret">📂 saves</span>
            <ul className="px-8 py-1">
              <li>
                <span className="caret">└ 📂 {t.WORLD_NAME_DIR}</span>
                <ul className=" px-8 py-1">
                  <li>
                    <span className="caret">└ 📂 datapacks</span>
                    <ul className=" px-8 py-1">
                      <li>
                        <span className="caret">└ 📂 dot</span>
                        <ul className=" px-8 py-1">
                          <li>└ pack.mcmeta</li>
                          <li>└ 📂 data</li>
                          <ul className="px-8 py-1">
                            <span className="caret">└ 📂 dot_pack</span>
                            <ul className="px-8 py-1">
                              <span className="caret">└ 📂 function</span>
                              <ul className="px-8 py-1">
                                <span className="caret">└ cmd.mcfunction</span>
                              </ul>
                            </ul>
                          </ul>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </ul>
        </div>

        <div className="text-xl font-semibold mt-8 mb-2"> Step4. {t.JAVA_COMMAND_SECTION4}</div>
        <div>{t.JAVA_COMMAND_TEXT4}</div>
      </div>
    </>
  );
};

export default CommandHelpJavaComponent;
