/* eslint-disable @next/next/no-img-element */
import CrossButton from "src/components/Common/CrossButton.tsx";
import { useBlockDBContext } from "src/store/useBlockDB";
import { useEditorContext } from "src/store/useEditor";
import { useEditorCanvasContext } from "src/store/useEditorCanvas";

interface Props {
  isOpen: boolean;
  setIsOpen: (isModalOpen: boolean) => void;
}

const ReplaceMenu = ({ isOpen, setIsOpen }: Props) => {
  const close = () => {
    setIsOpen(false);
  };
  const handleReplace = () => {
    replace(replaceFromJavaId, replaceToJavaId);
  };

  const { replaceFromJavaId, replaceToJavaId, setMode } = useEditorContext();
  const { getBlockBasic } = useBlockDBContext();
  const { replace } = useEditorCanvasContext();

  return (
    <>
      {isOpen && (
        <div className="bg-white w-32 absolute top-0 left-0 border-2 block z-[100]">
          <div className="flex justify-end">
            <button onClick={close}>
              <CrossButton />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="cursor-pointer" onClick={() => setMode("replaceFromPicker")}>
              <img
                className="rendering-pixelated"
                width={32}
                height={32}
                src={getBlockBasic(replaceFromJavaId).imagePath}
                alt="from"
              />
            </div>
            <span className="material-symbols-outlined">arrow_right_alt</span>
            <div className="cursor-pointer" onClick={() => setMode("replaceToPicker")}>
              <img
                className="rendering-pixelated"
                width={32}
                height={32}
                src={getBlockBasic(replaceToJavaId).imagePath}
                alt="from"
              />
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button onClick={handleReplace}>置き換え</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplaceMenu;
