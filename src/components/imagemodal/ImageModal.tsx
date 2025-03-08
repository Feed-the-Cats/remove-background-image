//import { computed, effect } from "@preact/signals-react";
import { FC, JSX, useRef } from "react";
//import { DropContext } from "../../dropContext/dropContext";
import FullscreenExitThinIcon from "@/components/icons/FullscreenExitThinIcon";
import { isModalOpenAtom, modalImageAtom, modalNameAtom } from "@/store/store";
import { useAtom, useAtomValue } from "jotai";
import styles from "./imageModal.module.css";

const ImageModal: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const modalImage = useAtomValue(modalImageAtom);
  const modalName = useAtomValue(modalNameAtom);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  /*   const isOpen = computed(() => isModalOpen.value === true); */
  const handleCloseImageModal = () => {
    // console.log("close modal");
    setIsModalOpen(false);
  };

  /* effect(() => {
    const modalDialog = modalRef.current;
    isOpen ? modalDialog?.showModal() : modalDialog?.close();
  }); */

  const modalDialog = modalRef.current;
  modalDialog && (isModalOpen ? modalDialog.showModal() : modalDialog.close());

  console.log("isModalOpen in", isModalOpen);

  return (
    <>
      <dialog ref={modalRef} className={styles.dialog}>
        <div className={styles.dialogContainer}>
          <button
            autoFocus
            className={styles.closeModal}
            onClick={handleCloseImageModal}
          >
            <FullscreenExitThinIcon className={styles.fullscreenExitIcon} />
          </button>
          <img
            className={styles.dialogImage}
            src={modalImage}
            alt={modalName}
          />
        </div>
      </dialog>
    </>
  );
};

export default ImageModal;
