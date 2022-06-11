import Link from "next/link";
import Modal from "react-modal";
import CrossButton from "src/components/Common/CrossButton.tsx";
import { useLocale } from "src/i18n/useLocale";

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
        <ol className="list-decimal ml-6">
          <li className="m-1">{t.USAGE1}</li>
          <li className="m-1">{t.USAGE2}</li>
          <li className="m-1">{t.USAGE3}</li>
          <li className="m-1">{t.USAGE4}</li>
          <li className="m-1">{t.USAGE5}</li>
          <li className="m-1">{t.USAGE6}</li>
        </ol>

        <Link href="/command-help">
          <a className="underline text-decoration">{t.HOW_TO_RUN_COMMAND}</a>
        </Link>
      </Modal>
    </>
  );
};

export default HelpModal;
