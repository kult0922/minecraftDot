import type { NextPage } from "next";
import EditorPageComponent from "src/Feature/Editor";
import { EditorProvider } from "src/context/useEditor";
import { EditorCanvasProvider } from "src/context/useEditorCanvas";
import { HistoryProvider } from "src/context/useHistory";

const Editor: NextPage = () => {
  return (
    <HistoryProvider>
      <EditorCanvasProvider>
        <EditorProvider>
          <EditorPageComponent />
        </EditorProvider>
      </EditorCanvasProvider>
    </HistoryProvider>
  );
};

export default Editor;
