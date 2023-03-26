/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import CrossButton from "src/components/CrossButton.tsx";
import { useEditorCanvasContext } from "src/context/useEditorCanvas";
import { useLocale } from "src/hooks/useLocale";

interface Props {
  isOpen: boolean;
  setIsOpen: (isModalOpen: boolean) => void;
}

const ViewMenu = ({ isOpen, setIsOpen }: Props) => {
  const { t } = useLocale();
  const [isChecked, setIsChecked] = useState(false);
  const { switchGrid, render } = useEditorCanvasContext();

  const handleClickGrid = () => {
    setIsChecked((prevState) => !prevState);
    switchGrid(!isChecked);
    render();
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="bg-neutral-600 border-neutral-700 w-32 absolute top-0 left-0 border-2 block z-[100]">
          <div className="flex justify-end">
            <button onClick={close}>
              <CrossButton />
            </button>
          </div>
          <div>
            <label htmlFor="check">{t.GRID}：</label>
            <input type="checkbox" id="check" checked={isChecked} onChange={() => handleClickGrid()} />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewMenu;
