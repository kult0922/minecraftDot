import { useLocale } from "src/i18n/useLocale";

interface Props {
  blockBasic: BlockBasic;
}

const BlockNameLabel: React.FC<Props> = ({ blockBasic }) => {
  const { locale } = useLocale();
  const blockName = locale === "en" ? blockBasic.javaId : blockBasic.jname;

  if (blockBasic === undefined || BlockNameLabel === null) return <></>;
  return (
    <>
      <div className="bg-black text-white p-1">{blockName}</div>
    </>
  );
};

export default BlockNameLabel;
