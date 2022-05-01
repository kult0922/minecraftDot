import type { NextPage } from "next";
import EditorPageComponent from "src/components/Pages/Editor";
import { EditorProvider } from "src/store/useEditor";
import { EditorCanvasProvider } from "src/store/useEditorCanvas";

const Editor: NextPage = () => {
  return (
    <EditorCanvasProvider>
      <EditorProvider>
        <EditorPageComponent />
      </EditorProvider>
    </EditorCanvasProvider>
  );
};

export default Editor;
