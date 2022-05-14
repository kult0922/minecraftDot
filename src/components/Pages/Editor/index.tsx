import Link from "next/link";
import SideToolBar from "src/components/Organisms/SideToolBar";
import EditorBoard from "src/components/Organisms/EditorBoard";
import BlockPalette from "src/components/Organisms/BlockPalette";
import TopToolBar from "src/components/Organisms/TopToolBar";

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
