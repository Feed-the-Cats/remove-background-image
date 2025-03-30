import { dropZone } from "@/assets/dropZoneIco";
import UploadThinIcon from "@/components/icons/UploadThinIcon";
import SampleImages from "@/components/sampleImages/SampleImages";
import {
  originalImageEffect,
  processImageEffect,
  uploadedFileAtom,
} from "@/store/store";
import { useAtom } from "jotai";
import svgToDataUri from "mini-svg-data-uri";
import { FC, JSX, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "react-toastify/dist/ReactToastify.css";

const DropZone: FC = (): JSX.Element => {
  const [, setUploadedFile] = useAtom(uploadedFileAtom);

  console.log("DropZone", typeof dropZone);
  console.log(svgToDataUri(dropZone));

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
    <div className="w-full min-h-192.5 h-auto flex flex-col items-center justify-around gap-16 shadow-shadow">
      <h1 className="text-titleH1 text-text pt-8 px-5">
        Remove background image
      </h1>
      <div
        className="w-73 h-73 relative flex flex-col items-center justify-center gap-3 text-xl font-bold text-primary bg-dropzoneBorder cursor-pointer overflow-hidden"
        {...getRootProps()}
      >
        <input {...getInputProps()} accept="image/png, image/jpeg" />
        <UploadThinIcon className="w-20 h-auto fill-primary" />
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
