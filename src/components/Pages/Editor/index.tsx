import Link from "next/link";
import SideToolBar from "src/components/Organisms/SideToolBar";
import EditorBoard from "src/components/Organisms/EditorBoard";

const EditorPageComponent = () => {
  return (
    <>
      <div className="text-xl text-center">Editor</div>
      <div className="flex justify-center">
        <div className="mr-1">
          <SideToolBar />
        </div>
        <EditorBoard />
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
