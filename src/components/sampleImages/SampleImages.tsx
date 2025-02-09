import URL_IMAGES from "@/assets/sampleImagesList";
import Image from "@/components/image/Image";
import useImageProcessor from "@/hooks/useImageProcessor";
import { imageNameAtom, imageSizeAtom } from "@/store/store";
import { useSetAtom } from "jotai";
import { FC, JSX } from "react";
import styles from "./sampleImages.module.css";

const SampleImages: FC = (): JSX.Element => {
  // const [uploadedFile, setUploadedFile] = useAtom(uploadedFileAtom);
  const imageSize = useSetAtom(imageSizeAtom);
  const imageName = useSetAtom(imageNameAtom);
  const { processImage } = useImageProcessor();

  type onClickType = {
    width: number;
    height: number;
    name: string;
    image: string;
  };
  const onClick = (
    //e: MouseEventHandler<HTMLElement>,
    { width, height, name, image }: onClickType
  ) => {
    imageSize({ width, height });
    imageName(name);
    // setUploadedFile(image);
    processImage(image);
  };
  return (
    <div className={styles.sampleImagesContainer}>
      <h3 className={styles.titleH3}>Or try these examples:</h3>
      <div className={styles.imagesContainer}>
        {URL_IMAGES.map(({ id, image, name, width, height }) => {
          return (
            <Image
              key={id}
              {...{
                onClick: () => onClick({ width, height, name, image }),
                id: id,
                src: image,
                name: name,
                imgCss: styles.img,
                figcaptionCss: styles.caption,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SampleImages;
