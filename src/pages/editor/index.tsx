import type { NextPage } from "next";
import EditorPageComponent from "src/components/Pages/Editor";
import { EditorProvider } from "src/hooks/useEditor";
import { EditorCanvasProvider } from "src/hooks/useEditorCanvas";
import { HistoryProvider } from "src/hooks/useHistory";

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
