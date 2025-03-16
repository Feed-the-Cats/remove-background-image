import FullscreenExitThinIcon from "@/components/icons/FullscreenExitThinIcon";
import { isModalOpenAtom, modalImageAtom, modalNameAtom } from "@/store/store";
import { useAtom, useAtomValue } from "jotai";
import { FC, JSX, useRef } from "react";
import Button from "../button/Button";

const ImageModal: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const modalImage = useAtomValue(modalImageAtom);
  const modalName = useAtomValue(modalNameAtom);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseImageModal = () => {
    setIsModalOpen(false);
  };

  const modalDialog = modalRef.current;
  modalDialog && (isModalOpen ? modalDialog.showModal() : modalDialog.close());

  console.log("isModalOpen in", isModalOpen);

  return (
    <>
      <dialog
        ref={modalRef}
        className="w-full h-full mx-auto bg-transparent border border-primary overflow-scroll scrollbar-hide"
        onCancel={handleCloseImageModal}
      >
        <div className="w-full h-full relative">
          <Button
            autoFocus
            className="inline-flex justify-center items-center absolute top-5 right-5 w-10 h-10 text-primary bg-transparent border-none rounded-lg border border-primary outline-none cursor-pointer list-none select-none touch-manipulation transition-colors duration-100 hover:bg-buttonHover"
            onClick={handleCloseImageModal}
          >
            <FullscreenExitThinIcon className="w-[25px] h-auto fill-primary" />
          </Button>
          <img className="w-full h-auto" src={modalImage} alt={modalName} />
        </div>
      </dialog>
    </>
  );
};

export default ImageModal;
