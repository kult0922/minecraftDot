import Link from "next/link";
import SideToolBar from "src/components/Organisms/SideToolBar";
import EditorBoard from "src/components/Organisms/EditorBoard";
import BlockPalette from "src/components/Organisms/BlockPalette";
import TopToolBar from "src/components/Organisms/TopToolBar";

const EditorPageComponent = () => {
  return (
    <>
      <div className="text-xl text-center">MinecraftDot Editor</div>
      <div className="flex justify-center">
        <div className="mr-1 mt-6">
          <SideToolBar />
        </div>
        <div className="flex flex-col items-start">
          <div className="ml-4">
            <TopToolBar />
          </div>
          <EditorBoard />
        </div>
        <div className="ml-2 mt-6">
          <BlockPalette />
        </div>
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
