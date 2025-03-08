import { URL_IMAGES, urlImageType } from "@/assets/sampleImagesList";
import Image from "@/components/image/Image";
import useImageProcessor from "@/hooks/useImageProcessor";
import { imageSizeAtom, sourceImageNameAtom } from "@/store/store";
import { useSetAtom } from "jotai";
import { FC, JSX } from "react";
import styles from "./sampleImages.module.css";

const SampleImages: FC = (): JSX.Element => {
  // const [uploadedFile, setUploadedFile] = useAtom(uploadedFileAtom);
  const sourceImageName = useSetAtom(sourceImageNameAtom);
  // imn = useAtomValue(sourceImageNameAtom);
  // const imageName = useSetAtom(imageNameAtom);
  const imageSize = useSetAtom(imageSizeAtom);
  const { processImage } = useImageProcessor();

  const handleClickImage = (
    //e: MouseEventHandler<HTMLElement>,
    { width, height, name, image }: urlImageType
  ) => {
    imageSize({ width, height });
    // setUploadedFile(image);
    sourceImageName(name);
    processImage(image);
    // const tt = [width, height, name, image];
    // console.log("sourceImageName", imn);
    // console.log("width, height, name, image", tt);
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
                onClick: () => handleClickImage({ width, height, name, image }),
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
