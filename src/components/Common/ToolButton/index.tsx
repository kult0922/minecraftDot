import { prependOnceListener } from "process";
import { Children, ReactNode } from "react";
import { text } from "stream/consumers";

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
          className="w-8 h-8  justify-center flex items-center border 
                    bg-slate-700 text-white cursor-pointer
                    peer-checked:bg-slate-300 peer-checked:text-black"
        >
          {children}
        </div>
      </label>
    </>
  );
};

export default ToolButton;
