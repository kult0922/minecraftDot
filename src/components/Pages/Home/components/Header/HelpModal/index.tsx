import Link from "next/link";
import Modal from "react-modal";
import CrossButton from "src/components/Common/CrossButton.tsx";
import { useLocale } from "src/hooks/useLocale";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "7px",
    backgroundColor: "#2d2d2d",
    marginRight: "-50%",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
  },
};

const HelpModal = ({ isModalOpen, setIsModalOpen }: Props) => {
  const { locale, t } = useLocale();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} ariaHideApp={false} onRequestClose={closeModal} style={modalStyles}>
        <div className="flex justify-end mb-3">
          <button onClick={closeModal}>
            <CrossButton />
          </button>
        </div>
        <div className="ml-6">
          <div className="mb-3 text-lg">{t.USAGE}</div>
          <ol className="list-decimal">
            <li className="mx-4">{t.USAGE1}</li>
            <li className="mx-4">{t.USAGE2}</li>
            <li className="mx-4">{t.USAGE3}</li>
            <li className="mx-4">{t.USAGE4}</li>
            <li className="mx-4">{t.USAGE5}</li>
            <li className="mx-4">{t.USAGE6}</li>
          </ol>

          <div className="my-3">
            <Link href="/command-help">
              <a className="underline text-decoration">{t.HOW_TO_RUN_COMMAND}</a>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HelpModal;
