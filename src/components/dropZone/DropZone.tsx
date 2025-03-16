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

  return (
    <div className="w-full min-h-[777px] h-auto flex flex-col items-center justify-around gap-16 shadow-shadow">
      <h1 className="text-titleH1 text-text pt-[30px] px-[19px]">
        Remove background image
      </h1>
      <div
        className="w-[300px] h-[300px] relative flex flex-col items-center justify-center gap-3 text-xl font-bold text-primary bg-dropzoneBorder cursor-pointer overflow-hidden"
        {...getRootProps()}
      >
        <input {...getInputProps()} accept="image/png, image/jpeg" />
        <UploadThinIcon className="w-[90px] h-auto fill-primary" />
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
