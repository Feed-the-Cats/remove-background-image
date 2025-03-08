import UploadThinIcon from "@/components/icons/UploadThinIcon";
import SampleImages from "@/components/sampleImages/SampleImages";
import useImageProcessor from "@/hooks/useImageProcessor";
import toastConfig from "@/lib/toastConfig";
import { imageSizeAtom, sourceImageNameAtom } from "@/store/store";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, JSX, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./dropZone.module.css";

const DropZone: FC = (): JSX.Element => {
  const setImageSize = useSetAtom(imageSizeAtom);
  const sourceImageName = useSetAtom(sourceImageNameAtom);
  const sourceImageNameValue = useAtomValue(sourceImageNameAtom);
  const { processImage } = useImageProcessor();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      sourceImageName(file.name);
      const img = new Image();
      const toastError = (error: ProgressEvent<FileReader>) =>
        toast(`${error}`, toastConfig);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("sourceImageNameValue", sourceImageNameValue);
        img.onload = () => {
          setImageSize({ width: img.width, height: img.height });
          console.log("width", img.width, "height", img.height);
          // sourceImageName(file.name);
          processImage(img.src);
        };
        img.src = reader.result as string;
      };
      reader.onerror = (error) => {
        toastError(error);
      };
    },
    [sourceImageName, processImage, setImageSize, sourceImageNameValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div className={styles.dropZoneContainer}>
      <h1 className={styles.titleH1}>Remove background image</h1>
      <div className={styles.dropZone} {...getRootProps()}>
        <input {...getInputProps()} accept="image/png, image/jpeg" />
        <UploadThinIcon className={styles.uploadIcon} />
        {isDragActive ? (
          <p>Drop the files here !</p>
        ) : (
          <div>
            <p>Drag files here.</p>
            <p>or click to select files.</p>
          </div>
        )}
      </div>
      <SampleImages />
    </div>
  );
};

export default DropZone;
