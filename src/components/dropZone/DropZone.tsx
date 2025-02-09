import UploadThinIcon from "@/components/icons/UploadThinIcon";
import SampleImages from "@/components/sampleImages/SampleImages";
import useImageProcessor from "@/hooks/useImageProcessor";
import toastConfig from "@/lib/toastConfig";
import { imageNameAtom, imageSizeAtom } from "@/store/store";
import { useAtom } from "jotai";
import { FC, JSX, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./dropZone.module.css";

const DropZone: FC = (): JSX.Element => {
  //const [uploadedFile, setUploadedFile] = useAtom(uploadedFileAtom);
  const [imageName, setImageName] = useAtom(imageNameAtom);
  const [imageSize, setImageSize] = useAtom(imageSizeAtom);
  const { processImage } = useImageProcessor();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      const img = new Image();
      const toastError = (error: ProgressEvent<FileReader>) =>
        toast(`${error}`, toastConfig);

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
        };
        setImageName(file.name);
        img.src = reader.result as string;
        // setUploadedFile(img.src);
        processImage(img.src);
      };
      reader.onerror = (error) => {
        toastError(error);
      };

      /*   img.onload = () => {
      imageSize.value = { width: img.width, height: img.height };
    };
console.warn("file size", file)
    imageName.value = file.name;
    img.src = uploadedFile.value = URL.createObjectURL(file);
    processImage.value(uploadedFile.value); */
    },
    [imageName, imageSize, processImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.dropZoneContainer}>
      <h1 className={styles.titleH1}>Remove backround image</h1>
      <div className={styles.dropZone} {...getRootProps()}>
        <input {...getInputProps()} accept="image/png, image/jpeg" />
        <UploadThinIcon className={styles.uploadIcon} />
        {isDragActive ? (
          <p>Drop the files here !</p>
        ) : (
          <div>
            <p>Drop files here.</p>
            <p>or click to select files.</p>
          </div>
        )}
      </div>
      <SampleImages />
    </div>
  );
};

export default DropZone;
