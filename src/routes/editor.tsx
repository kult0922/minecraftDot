import { createFileRoute } from "@tanstack/react-router";
import EditorPageComponent from "src/Feature/Editor";
import { EditorProvider } from "src/context/useEditor";
import { EditorCanvasProvider } from "src/context/useEditorCanvas";
import { HistoryProvider } from "src/context/useHistory";

function EditorPage() {
  return (
    <HistoryProvider>
      <EditorCanvasProvider>
        <EditorProvider>
          <EditorPageComponent />
        </EditorProvider>
      </EditorCanvasProvider>
    </HistoryProvider>
  );
}

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});
