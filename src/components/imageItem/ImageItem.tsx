import Image from "@/components/image/Image";
import styles from "@/components/imageResult/imageResult.module.css";
import useImageState from "@/hooks/useImageState";
import downloadImage from "@/lib/downloadImage";
import { cn } from "@/lib/utils";
import { type PrimitiveAtom } from "jotai";
import { MouseEvent } from "react";
import Button from "../iconButton/Button";
import DownloadThinIcon from "../icons/DownloadThinIcon";
import ExpandThinIcon from "../icons/ExpandThinIcon";
import FullscreenThinIcon from "../icons/FullscreenThinIcon";

type imageItemType = {
  imageAtom: PrimitiveAtom<imageType>;
  setModalImage: (src: string) => void;
  setModalName: (name: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  imgCss?: string;
  figcaptionCss?: string;
  buttonsContainerVerticalCss?: string;
  buttonsContainerHorizontalCss?: string;
};

const ImageItem = ({
  imageAtom,
  setModalImage,
  setModalName,
  setIsModalOpen,
  imgCss,
  figcaptionCss,
  buttonsContainerVerticalCss,
  buttonsContainerHorizontalCss,
}: imageItemType) => {
  const { value, setValue } = useImageState(imageAtom);
  const { id, image, name, width, height, isSelected } = value;

  //const buttonDefault = "";

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
  };
  return (
    <Image
      {...{
        id: id,
        imgCss: imgCss,
        src: image,
        name: name,
        figcaptionCss: figcaptionCss,
        figcaptionText: (
          <>
            <div>
              <div className="inline-flex justify-center">
                <ExpandThinIcon className="w-4 h-auto fill-primary" />
              </div>
              <p>Name : {name}</p>
              <p>
                Sise w : {width} - h : {height}
              </p>
            </div>
            <div
              className={cn(
                height > width
                  ? buttonsContainerVerticalCss
                  : buttonsContainerHorizontalCss
              )}
            >
              <div className={styles.button}>
                <p>Download</p>
                <Button
                  className="inline-flex justify-center items-center hover:bg-buttonHover"
                  onClick={() => downloadImage(image)}
                >
                  <DownloadThinIcon className="w-6 h-auto fill-primary" />
                </Button>
              </div>
              <div className={styles.button}>
                <p>Fullscreen</p>
                <Button
                  className="inline-flex justify-center items-center hover:bg-buttonHover"
                  onClick={(e: MouseEvent<HTMLButtonElement>) =>
                    handleFullscreenImage(e)
                  }
                >
                  <FullscreenThinIcon className="w-6 h-auto fill-primary" />
                </Button>
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
