import SideToolBar from "./components/SideToolBar";
import EditorBoard from "./components/EditorBoard";
import BlockPalette from "./components/BlockPalette";
import TopToolBar from "./components/TopToolBar";

const EditorPageComponent = () => {
  return (
    <>
      <div className="bg-neutral-700">
        <div className="flex justify-start">
          <TopToolBar />
        </div>
        <div className="h-[2px] 1-[100wv] bg-neutral-800"></div>
        <div className="flex flex-wrap justify-start">
          <SideToolBar />
          <EditorBoard />
          <div className="mx-3 my-2">
            <BlockPalette />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorPageComponent;
