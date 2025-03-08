import DownloadThinIcon from "@/components/icons/DownloadThinIcon";
import ExpandThinIcon from "@/components/icons/ExpandThinIcon";
import FullscreenThinIcon from "@/components/icons/FullscreenThinIcon";
import Image from "@/components/image/Image";
import { FC, JSX, MouseEvent, useEffect } from "react";
//import CheckCircleThinIcon from "../icons/CheckCircleThinIcon";
import ImageModal from "@/components/imagemodal/ImageModal";
import useScrollToActiveImage from "@/hooks/useScrollToActiveImage";
import downloadImage from "@/lib/downloadImage";
import selectedToZip from "@/lib/selecImagesForZip";
import {
  activeIdAtom,
  imagesAtom,
  isButtonDisabledAtom,
  isModalOpenAtom,
  modalImageAtom,
  modalNameAtom,
} from "@/store/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import styles from "./imageResult.module.css";

const ImageResult: FC = (): JSX.Element => {
  const images = useAtomValue(imagesAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [isButtonDisabled, setIsButtonDisabled] = useAtom(isButtonDisabledAtom);
  const setModalImage = useSetAtom(modalImageAtom);
  const setModalName = useSetAtom(modalNameAtom);
  const setActiveId = useSetAtom(activeIdAtom);

  const handleFullscreenImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.currentTarget as HTMLButtonElement;
    const img = button.closest("figure")?.children[1] as HTMLImageElement;
    setModalImage(img.src);
    setModalName(img.alt);
    setIsModalOpen(true);
  };

  const selectImage = (e: MouseEvent<HTMLImageElement>, selectedId: string) => {
    const img = e.currentTarget as HTMLImageElement;
    const circleCheck = img.closest("figure")?.children[0] as SVGElement;

    img.dataset.selected === "true"
      ? (img.dataset.selected = "false")
      : (img.dataset.selected = "true");

    circleCheck.dataset.selected === "true"
      ? (circleCheck.dataset.selected = "false")
      : (circleCheck.dataset.selected = "true");

    const image = images.find(({ id }) => id === selectedId);
    if (image) {
      image.isSelected = !image.isSelected;
      setIsButtonDisabled(
        images.filter(({ isSelected }) => isSelected === true).length >= 1
          ? false
          : true
      );
    }
  };

  /*   const activeId = computed(() => `#${images.value[0]?.id}`);

  effect(() => {
    document
      .querySelector(activeId.value)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }); */

  useScrollToActiveImage();
  useEffect(() => {
    if (images.length > 0) {
      setActiveId(images[0].id); // Définir l'ID de la première image comme actif
    }
  }, [images, setActiveId]);

  return (
    <>
      {!!images.length && (
        <>
          <h1 className={styles.titleH1}>Gallery</h1>{" "}
          <button
            className={styles.downloadZip}
            onClick={() => selectedToZip(images)}
            disabled={isButtonDisabled}
          >
            Download all selected as zip
          </button>
        </>
      )}
      <div className={styles.imageContainer}>
        {images.map(({ id, image, name, width, height, isSelected }) => {
          //console.log("img in", image)
          return (
            <Image
              key={id}
              {...{
                id: id,
                imgCss: styles.imgCss,
                src: image,
                name: name,
                figcaptionCss: styles.captionTransition,
                figcaptionText: (
                  <>
                    <div>
                      <div>
                        <ExpandThinIcon className={styles.expand} />
                      </div>
                      <p>Name : {name}</p>
                      <p>
                        Sise w : {width} - h : {height}
                      </p>
                    </div>
                    <div
                      className={
                        height > width
                          ? styles.buttonsContainerVertical
                          : styles.buttonsContainerHorizontal
                      }
                    >
                      <div className={styles.button}>
                        <p>Download</p>
                        <button
                          className={styles.downloadButton}
                          onClick={() => downloadImage(image)}
                        >
                          <DownloadThinIcon className={styles.downloadIcon} />
                        </button>
                      </div>
                      <div className={styles.button}>
                        <p>Fullscreen</p>
                        <button
                          className={styles.downloadButton}
                          onClick={(e: MouseEvent<HTMLButtonElement>) =>
                            handleFullscreenImage(e)
                          }
                        >
                          <FullscreenThinIcon
                            className={styles.fullscreenIcon}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                ),
                isSelected,
                selectClick: (e: MouseEvent<HTMLImageElement>) =>
                  selectImage(e, id),
              }}
            />
          );
        })}
      </div>
      {isModalOpen && <ImageModal />}
    </>
  );
};

export default ImageResult;
