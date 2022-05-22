interface Props {
  blockBasic: BlockBasic;
}

const BlockNameLabel: React.FC<Props> = ({ blockBasic }) => {
  if (blockBasic === undefined || BlockNameLabel === null) return <></>;
  return (
    <>
      <div className="bg-black text-white p-1">{blockBasic.javaId}</div>
    </>
  );
};

export default BlockNameLabel;
