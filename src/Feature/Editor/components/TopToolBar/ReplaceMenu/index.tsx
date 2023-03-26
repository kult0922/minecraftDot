/* eslint-disable @next/next/no-img-element */
import CrossButton from "src/components/CrossButton.tsx";
import { useLocale } from "src/hooks/useLocale";
import { useBlockDBContext } from "src/context/useBlockDB";
import { useEditorContext } from "src/context/useEditor";
import { useEditorCanvasContext } from "src/context/useEditorCanvas";

interface Props {
  isOpen: boolean;
  setIsOpen: (isModalOpen: boolean) => void;
}

const ReplaceMenu = ({ isOpen, setIsOpen }: Props) => {
  const { t } = useLocale();
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
        <div className="bg-neutral-600 border-neutral-700 w-32 absolute top-0 left-0 border-2 block z-[100]">
          <div className="flex justify-end">
            <button onClick={close}>
              <CrossButton />
            </button>
          </div>
          <div className="flex justify-center items-center mt-2">
            <div className="cursor-pointer" onClick={() => setMode("replaceFromPicker")}>
              <img
                className="rendering-pixelated"
                width={32}
                height={32}
                src={getBlockBasic(replaceFromJavaId).imagePath}
                alt="from"
              />
            </div>

            <div className="flex items-center mx-1">
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </div>

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
            <button onClick={handleReplace}>{t.REPLACE}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReplaceMenu;
