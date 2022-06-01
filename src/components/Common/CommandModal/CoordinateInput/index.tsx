import { ReactNode } from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoordinateInput: React.FC<Props> = ({ onChange }) => {
  return (
    <>
      <input
        type="number"
        onChange={onChange}
        className="border-2 border-neutral-600 bg-neutral-900 rounded w-14"
      />
    </>
  );
};

export default CoordinateInput;
