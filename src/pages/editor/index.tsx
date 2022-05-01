import type { NextPage } from "next";
import EditorComponent from "src/components/Pages/Editor";
import { EditorProvider } from "src/store/useEditor";
import { EditorCanvasProvider } from "src/store/useEditorCanvas";

const Editor: NextPage = () => {
  return (
    <EditorCanvasProvider>
      <EditorProvider>
        <EditorComponent />
      </EditorProvider>
    </EditorCanvasProvider>
  );
};

export default Editor;
