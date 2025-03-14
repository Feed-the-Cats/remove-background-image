import UploadThinIcon from "@/components/icons/UploadThinIcon";
import SampleImages from "@/components/sampleImages/SampleImages";
import {
  originalImageEffect,
  processImageEffect,
  uploadedFileAtom,
} from "@/store/store";
import { useAtom } from "jotai";
import { FC, JSX, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";
import styles from "./dropZone.module.css";

const DropZone: FC = (): JSX.Element => {
  const [, setUploadedFile] = useAtom(uploadedFileAtom);

  useAtom(originalImageEffect);
  useAtom(processImageEffect);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      setUploadedFile(file);
    },
    [setUploadedFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  /*   useAtom(originalImageEffect);
  useAtom(processImageEffect); */

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
