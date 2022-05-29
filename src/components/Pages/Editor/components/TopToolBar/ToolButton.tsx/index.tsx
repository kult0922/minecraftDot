interface Props {
  onClick: () => void;
  text: string;
}

const ToolButton = ({ onClick, text }: Props) => {
  return (
    <>
      <button onClick={onClick}>
        <span className="flex items-center border-2 rounded bg-slate-200">{text}</span>
      </button>
    </>
  );
};

export default ToolButton;
