import React from "react";
import { useRef, useState, memo } from "react";

interface Props {
  changeSize: (size: number) => void;
}

const SizeInput = memo<Props>(({ changeSize }) => {
  return (
    <>
      <input
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          changeSize(Number(event.target.value));
        }}
        defaultValue={128}
        type="number"
        className="text-center w-24 bg-neutral-900"
      />
    </>
  );
});

SizeInput.displayName = "SizeInput";

export default SizeInput;
