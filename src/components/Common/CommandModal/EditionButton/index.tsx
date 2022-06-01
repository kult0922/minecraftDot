import { ReactNode } from "react";

interface Props {
  selected: boolean;
  id: string;
  children: ReactNode;
  onChange: () => void;
}

const EditionButton: React.FC<Props> = ({ onChange, selected, id, children }) => {
  return (
    <>
      <label htmlFor={id} className="">
        <input type="radio" id={id} onChange={() => onChange()} checked={selected} className="hidden peer" />
        <div
          className="w-20 h-8 justify-center flex items-center rounded-md 
                    bg-neutral-900 cursor-pointer peer-checked:bg-m-green-light"
        >
          {children}
        </div>
      </label>
    </>
  );
};

export default EditionButton;
