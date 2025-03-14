import ImageItem from "@/components/imageItem/ImageItem";
import { FC, JSX, useEffect } from "react";
//import CheckCircleThinIcon from "../icons/CheckCircleThinIcon";
import ImageModal from "@/components/imagemodal/ImageModal";
import { useFirstImage } from "@/hooks/useFirstImage";
import useScrollToActiveImage from "@/hooks/useScrollToActiveImage";
import selectedToZip from "@/lib/selecImagesForZip";
import {
  activeIdAtom,
  filterSelected,
  isButtonDisabledAtom,
  isModalOpenAtom,
  loadingAtom,
  modalImageAtom,
  modalNameAtom,
  splitedImagesAtom,
} from "@/store/store";
import { useAtom } from "jotai";
import styles from "./imageResult.module.css";

const ImageResult: FC = (): JSX.Element => {
  const [splitedImages] = useAtom(splitedImagesAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [isButtonDisabled, setIsButtonDisabled] = useAtom(isButtonDisabledAtom);
  const [, setModalImage] = useAtom(modalImageAtom);
  const [, setModalName] = useAtom(modalNameAtom);
  const [, setActiveId] = useAtom(activeIdAtom);
  const [filtered] = useAtom(filterSelected);
  const [loading] = useAtom(loadingAtom);

  const firstImage = useFirstImage(splitedImages);

  useEffect(() => {
    if (firstImage) {
      setActiveId(firstImage.id);
    }
  }, [firstImage, setActiveId]);

  console.log("splitedImages.length", splitedImages.length);
  useScrollToActiveImage();

  return (
    <>
      {loading && <div className={styles.loading}>Loading...</div>}
      {!!splitedImages.length && (
        <>
          <h1 className={styles.titleH1}>Gallery</h1>{" "}
          <button
            className={styles.downloadZip}
            onClick={() => selectedToZip()}
            disabled={isButtonDisabled}
          >
            Download all selected as zip
          </button>
        </>
      )}
      <div className={styles.imageContainer}>
        {splitedImages.map((imageAtom) => (
          <ImageItem
            key={imageAtom.toString()}
            imageAtom={imageAtom}
            setModalImage={setModalImage}
            setModalName={setModalName}
            setIsModalOpen={setIsModalOpen}
            setIsButtonDisabled={setIsButtonDisabled}
            filtered={filtered}
          />
        ))}
      </div>
      {isModalOpen && <ImageModal />}
    </>
  );
};

export default ImageResult;
