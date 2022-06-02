import React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useEditorContext } from "src/store/useEditor";

const PenSizeChange = () => {
  const { getPenSize, upPenSize, downPenSize, penSizeIndex } = useEditorContext();
  const penSizeSquare = useRef<HTMLDivElement>(null!);

  const updateSquareSize = () => {
    penSizeSquare.current.style.width = String(getPenSize() + 2) + "px";
    penSizeSquare.current.style.height = String(getPenSize() + 2) + "px";
  };

  const handleDownPenSize = useCallback(() => {
    downPenSize();
  }, [downPenSize]);

  const handleUpPenSize = useCallback(() => {
    upPenSize();
  }, [upPenSize]);

  useEffect(() => {
    updateSquareSize();
  }, [penSizeIndex]);

  return (
    <div className="flex flex-col justify-start bg-neutral-600">
      <div className="flex justify-center items-center w-8 h-8">
        <div ref={penSizeSquare} className="bg-white"></div>
      </div>
      <div className="text-center text-xs">{getPenSize()}</div>
      <div className="flex justify-around items-start text-xl leading-none">
        <button onClick={handleDownPenSize}>-</button>
        <button onClick={handleUpPenSize}>+</button>
      </div>
    </div>
  );
};

export default PenSizeChange;
