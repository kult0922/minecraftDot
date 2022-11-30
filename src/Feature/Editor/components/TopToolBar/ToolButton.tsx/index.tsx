interface Props {
  onClick: () => void;
  text: string;
}

const ToolButton = ({ onClick, text }: Props) => {
  return (
    <>
      <button onClick={onClick}>
        <span className="flex items-center rounded-sm hover:bg-neutral-800 px-4 py-0.5">{text}</span>
      </button>
    </>
  );
};

export default ToolButton;
