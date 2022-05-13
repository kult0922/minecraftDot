import Link from "next/link";
import SideToolBar from "src/components/Organisms/SideToolBar";
import EditorBoard from "src/components/Organisms/EditorBoard";
import BlockPalette from "src/components/Organisms/BlockPalette";
import TopToolBar from "src/components/Organisms/TopToolBar";

const EditorPageComponent = () => {
  return (
    <>
      <div className="text-xl text-center">MinecraftDot Editor</div>
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <TopToolBar />
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="align-top">
              <SideToolBar />
            </td>
            <td className="align-top">
              <EditorBoard />
            </td>
            <td className="align-top">
              <BlockPalette />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <Link href="/">
          <a>Back</a>
        </Link>
      </div>
    </>
  );
};

export default EditorPageComponent;
