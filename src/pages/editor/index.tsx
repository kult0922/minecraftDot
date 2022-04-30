import type { NextPage } from "next";
import EditorComponent from "src/components/Page/Editor";
import { EditorCanvasProvider } from "src/store/useEditorCanvas";

const Editor: NextPage = () => {
  return (
    <EditorCanvasProvider>
      <EditorComponent />
    </EditorCanvasProvider>
  );
};

export default Editor;
