import Image from "@/components/image/Image";
import styles from "@/components/SampleImages/sampleImages.module.css";
import {
  imageSizeAtom,
  sampleImagesAtom,
  sourceImageNameAtom,
  uploadedFileAtom,
} from "@/store/store";
import { useAtom } from "jotai";
import { FC, JSX } from "react";

const SampleImages: FC = (): JSX.Element => {
  const [sampleImages] = useAtom(sampleImagesAtom);
  const [, sourceImageName] = useAtom(sourceImageNameAtom);
  const [, setUploadedFile] = useAtom(uploadedFileAtom);
  const [, imageSize] = useAtom(imageSizeAtom);

  const handleClickImage = (
    //e: MouseEventHandler<HTMLElement>,
    { width, height, name, image }: urlImageType
  ) => {
    imageSize({ width, height });
    sourceImageName(name);
    setUploadedFile(image);
  };

  return (
    <div className={styles.sampleImagesContainer}>
      <h3 className={styles.titleH3}>Or try these examples:</h3>
      <div className={styles.imagesContainer}>
        {sampleImages.map(({ id, image, name, width, height }) => {
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
