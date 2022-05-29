import Link from "next/link";
import SideToolBar from "./components/SideToolBar";
import EditorBoard from "./components/EditorBoard";
import BlockPalette from "./components/BlockPalette";
import TopToolBar from "./components/TopToolBar";

const EditorPageComponent = () => {
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
          <a>Back</a>
        </Link>
      </div>
    </>
  );
};

export default EditorPageComponent;
