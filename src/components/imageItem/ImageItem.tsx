import Image from "@/components/image/Image";
import styles from "@/components/imageResult/imageResult.module.css";
import useImageState from "@/hooks/useImageState";
import downloadImage from "@/lib/downloadImage";
import { type PrimitiveAtom } from "jotai";
import { MouseEvent } from "react";
import DownloadThinIcon from "../icons/DownloadThinIcon";
import ExpandThinIcon from "../icons/ExpandThinIcon";
import FullscreenThinIcon from "../icons/FullscreenThinIcon";

const ImageItem = ({
  imageAtom,
  setModalImage,
  setModalName,
  setIsModalOpen,
  setIsButtonDisabled,
  filtered,
}: {
  imageAtom: PrimitiveAtom<imageType>;
  setModalImage: (src: string) => void;
  setModalName: (name: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsButtonDisabled: (disabled: boolean) => void;
  filtered: boolean;
}) => {
  const { value, setValue } = useImageState(imageAtom);
  const { id, image, name, width, height, isSelected } = value;

  const handleFullscreenImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.currentTarget as HTMLButtonElement;
    const img = button.closest("figure")?.children[1] as HTMLImageElement;
    setModalImage(img.src);
    setModalName(img.alt);
    setIsModalOpen(true);
  };

  const handleSelect = (e: MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    const circleCheck = img.closest("figure")?.children[0] as SVGElement;

    img.dataset.selected = img.dataset.selected === "true" ? "false" : "true";
    circleCheck.dataset.selected =
      circleCheck.dataset.selected === "true" ? "false" : "true";

    setValue({ ...value, isSelected: !value.isSelected });
    setIsButtonDisabled(!filtered);
  };
  return (
    <Image
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
                  <FullscreenThinIcon className={styles.fullscreenIcon} />
                </button>
              </div>
            </div>
          </>
        ),
        isSelected,
        selectClick: (e: MouseEvent<HTMLImageElement>) => handleSelect(e),
      }}
    />
  );
};

export default ImageItem;
