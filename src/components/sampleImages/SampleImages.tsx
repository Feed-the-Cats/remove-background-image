import Image from "@/components/image/Image";
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
    <div className="min-h-60 h-auto max-w-full min-w-72 mb-8 p-5 flex flex-col justify-around border border-primary text-text bg-card">
      <h3 className="mb-5">Or try these examples:</h3>
      <div className="w-auto flex flex-wrap justify-center gap-2.5">
        {sampleImages.map(({ id, image, name, width, height }) => {
          return (
            <Image
              key={id}
              {...{
                onClick: () => handleClickImage({ width, height, name, image }),
                id: id,
                src: image,
                name: name,
                imgCss: "w-auto h-36 cursor-pointer",
                figcaptionCss: "hidden",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SampleImages;
