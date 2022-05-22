/* eslint-disable @next/next/no-img-element */

interface Props {
  checked: boolean;
  blockBasic: BlockBasic;
  handleBlockClick: (javaId: string) => void;
}

const BlockButton: React.FC<Props> = ({ checked, blockBasic, handleBlockClick }) => {
  return (
    <>
      <label htmlFor={blockBasic.javaId} className="" key={blockBasic.javaId + "label"}>
        <input
          type="radio"
          id={blockBasic.javaId}
          onChange={() => {}}
          checked={checked}
          className="hidden peer"
        />

        <img
          className="inline cursor-pointer rendering-pixelated m-[2px] p-[0px] sm:border-[4px] border-2 border-transparent peer-checked:border-slate-400"
          src={blockBasic.imagePath}
          alt="paletteBlock"
          width={32}
          key={blockBasic.javaId}
          onClick={() => handleBlockClick(blockBasic.javaId)}
        ></img>
      </label>
    </>
  );
};

export default BlockButton;
