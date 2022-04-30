import type { NextPage } from "next";
import EditorComponent from "src/components/Page/Editor";
import { EditorProvider } from "src/store/useEditor";

const Editor: NextPage = () => {
  return (
    <EditorProvider>
      <EditorComponent />
    </EditorProvider>
  );
};

export default Editor;
