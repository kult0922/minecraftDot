import { useEffect, useRef, useState } from "react";
import geenrateImageFromBlueprint from "src/functions/ImageTrans/generateImageFromBlueprint";
import { useBlockDBContext } from "src/store/useBlockDB";
import Modal from "react-modal";
import { useBlueprintContext } from "src/store/useBlueprint";
import getContext from "src/functions/utils/getContext";
import getBufferCanvas from "src/functions/utils/getBufferCanvas";
import CrossButton from "src/components/Atoms/CrossButton.tsx";
import { CoreTransformationContext } from "typescript";
import { calcRBCoordinate, validInput } from "src/functions/coordinate/cornerCoordinate";
import generateCommand from "src/functions/command/generateCommand";

interface Props {
  blueprint: string[][];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

interface CornerCoordinate {
  ltx: number;
  lty: number;
  ltz: number;
  rtx: number;
  rty: number;
  rtz: number;
  lbx: number;
  lby: number;
  lbz: number;
}
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "7px",
    marginRight: "-50%",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
  },
};

const CommandModal = ({ blueprint, isModalOpen, setIsModalOpen }: Props) => {
  const [RBCoordinate, setRBCoordinate] = useState<Coordinate3D>({ x: 0, y: 0, z: 0 });
  const [cornerCoordinates, setCornerCoordinates] = useState<CornerCoordinate>({
    ltx: 0,
    lty: 0,
    ltz: 0,
    rtx: 0,
    rty: 0,
    rtz: 0,
    lbx: 0,
    lby: 0,
    lbz: 0,
  });
  // const [coodinateIsOk, setCoordinateIsOk] = useState(false);
  const { setInitBlueprint } = useBlueprintContext();
  const { blockImageDataDict } = useBlockDBContext();
  const mainCanvas = useRef(null);
  const mainCanvasWidth = 1000;
  const mainCanvasHeight = 1000;

  const tryComplement = (coordinate: CornerCoordinate, expectedWidth: number, expectedHeight: number) => {
    const c1: Coordinate3D = { x: coordinate.ltx, y: coordinate.lty, z: coordinate.ltz };
    const c2: Coordinate3D = { x: coordinate.rtx, y: coordinate.rty, z: coordinate.rtz };
    const c3: Coordinate3D = { x: coordinate.lbx, y: coordinate.lby, z: coordinate.lbz };

    if (validInput(c1, c2, c3, expectedWidth, expectedHeight)) {
      /* if coordinate is valid, show RB coordinate */
      setRBCoordinate(calcRBCoordinate(c1, c2, c3));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeCoordinate = (key: string, value: number) => {
    setCornerCoordinates({ ...cornerCoordinates, [key]: value });
  };

  useEffect(() => {
    if (blueprint === undefined || blueprint.length === 0) return;
    tryComplement(cornerCoordinates, blueprint[0].length, blueprint.length);
  }, [cornerCoordinates]);

  const afterOpenModal = () => {
    const minecraftImage = geenrateImageFromBlueprint(blueprint, blockImageDataDict);

    /* set minecraftImage to buffer canvs */
    const bufferCanvas = getBufferCanvas(minecraftImage, minecraftImage.width, minecraftImage.height);

    /* output image */
    const mainCanvasContext = getContext(mainCanvas.current, mainCanvasWidth, mainCanvasHeight);
    mainCanvasContext.drawImage(bufferCanvas, 0, 0, mainCanvasWidth, mainCanvasHeight);
    setInitBlueprint(blueprint);
  };

  const handleGenerateCommand = () => {
    const LT = { x: cornerCoordinates.ltx, y: cornerCoordinates.lty, z: cornerCoordinates.ltz };
    const RT = { x: cornerCoordinates.rtx, y: cornerCoordinates.rty, z: cornerCoordinates.rtz };
    const LB = { x: cornerCoordinates.lbx, y: cornerCoordinates.lby, z: cornerCoordinates.lbz };
    console.log(generateCommand(blueprint, LT, RT, LB));
  };

  if (blueprint === undefined || blueprint.length === 0) return <></>;
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        onAfterOpen={afterOpenModal}
        style={modalStyles}
      >
        <div className="flex justify-end mb-3">
          <button onClick={closeModal}>
            <CrossButton />
          </button>
        </div>

        <div className="flex justify-center">{blueprint.length}</div>

        <div className="flex justify-between">
          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-col">
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("ltx", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("lty", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("ltz", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
            </div>
            <div>{blueprint[0].length}</div>
            <div className="flex flex-col">
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("lbx", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("lby", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("lbz", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
            </div>
          </div>

          <div className="w-[50vw] flex justify-center">
            <canvas id="canvas-out" ref={mainCanvas} className="w-[100%] border-2"></canvas>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("rtx", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("rty", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
              <input
                type="number"
                onChange={(e) => handleChangeCoordinate("rtz", Number(e.target.value))}
                className="border-2 rounded w-14"
              />
            </div>
            {/* these input is read only */}
            <div className="flex flex-col">
              <input
                type="number"
                value={RBCoordinate?.x}
                readOnly={true}
                className="border-2 bg-slate-300 rounded w-14"
              />
              <input
                type="number"
                value={RBCoordinate?.y}
                readOnly={true}
                className="border-2 bg-slate-300 rounded w-14"
              />
              <input
                type="number"
                value={RBCoordinate?.z}
                readOnly={true}
                className="border-2 bg-slate-300 rounded w-14"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleGenerateCommand}>コマンド生成</button>
        </div>
      </Modal>
    </>
  );
};

export default CommandModal;