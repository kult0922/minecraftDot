import type { NextPage } from "next";
import EditorPageComponent from "src/components/Pages/Editor";
import { EditorProvider } from "src/store/useEditor";
import { EditorCanvasProvider } from "src/store/useEditorCanvas";
import { HistoryProvider } from "src/store/useHistory";

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
