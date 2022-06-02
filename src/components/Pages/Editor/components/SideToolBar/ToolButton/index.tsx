import { ReactNode } from "react";

interface Props {
  selected: boolean;
  id: string;
  children: ReactNode;
  onChange: () => void;
}

const ToolButton: React.FC<Props> = ({ onChange, selected, id, children }) => {
  return (
    <>
      <label htmlFor={id} className="">
        <input type="radio" id={id} onChange={() => onChange()} checked={selected} className="hidden peer" />
        <div
          className="w-10 h-10  justify-center flex items-center
                    bg-neutral-600 text-white cursor-pointer
                    peer-checked:bg-neutral-800"
        >
          {children}
        </div>
      </label>
    </>
  );
};

export default ToolButton;
