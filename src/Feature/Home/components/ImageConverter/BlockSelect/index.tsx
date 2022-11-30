import BlockButton from "src/components/BlockButton";

interface Props {
  blockGroupMap: Map<string, Array<BlockBasic>>;
  blockUseFlag: Map<string, boolean>;
  groupButtonFlag: Map<string, boolean>;
  changeUseBlockFlag: (jabaId: string) => void;
  changeGroupButtonFlag: (group: string) => void;
}

const BlockSelect = ({
  changeGroupButtonFlag,
  changeUseBlockFlag,
  blockGroupMap,
  blockUseFlag,
  groupButtonFlag,
}: Props) => {
  const handleBlockClick = (javaId: string) => {
    changeUseBlockFlag(javaId);
  };

  const handleGroupButtonClick = (group: string) => {
    changeGroupButtonFlag(group);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-fit bg-neutral-900 p-10 rounded-md">
          {Array.from(blockGroupMap).map((blockGroup) => (
            <div key={"select-block-row-" + blockGroup[0]}>
              <div>
                <label htmlFor={blockGroup[0]} className="">
                  <input
                    type="checkbox"
                    id={blockGroup[0]}
                    onChange={() => handleGroupButtonClick(blockGroup[0])}
                    checked={(groupButtonFlag.get(blockGroup[0]) as boolean) || false}
                    className="peer"
                  />
                </label>
              </div>

              <div className="flex justify-start flex-wrap items-center">
                {blockGroup[1].map((blockBasic) => (
                  <BlockButton
                    key={"select-block-button-" + blockBasic.javaId}
                    checked={(blockUseFlag.get(blockBasic.javaId) as boolean) || false}
                    handleBlockClick={() => handleBlockClick(blockBasic.javaId)}
                    blockBasic={blockBasic}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockSelect;
