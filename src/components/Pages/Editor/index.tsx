import Link from "next/link";
import SideToolBar from "./components/SideToolBar";
import EditorBoard from "./components/EditorBoard";
import BlockPalette from "./components/BlockPalette";
import TopToolBar from "./components/TopToolBar";
import { useRouter } from "next/router";
import en from "src/i18n/locales/en";
import ja from "src/i18n/locales/ja";

const EditorPageComponent = () => {
  const { locale } = useRouter();
  const t = locale === "en" ? en : ja;

  return (
    <>
      <div className="flex justify-center">
        <TopToolBar />
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="mr-2">
          <SideToolBar />
        </div>
        <EditorBoard />
        <BlockPalette />
      </div>

      <div className="flex justify-center mt-4">
        <Link href="/">
          <a>{t.BACK_TO_HOME}</a>
        </Link>
      </div>
    </>
  );
};

export default EditorPageComponent;
