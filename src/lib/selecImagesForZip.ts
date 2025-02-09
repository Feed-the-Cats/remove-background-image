import { imagesAtom } from "@/store/store";
import { saveAs } from "file-saver";
import { ExtractAtomValue } from "jotai";
import JSZip from "jszip";

const selectedToZip = async (images: ExtractAtomValue<typeof imagesAtom>) => {
  const selectedImages = images.filter(({ isSelected }) => isSelected === true);

  const zip = new JSZip();
  const imageFolder = zip.folder("images");
  selectedImages.forEach(({ name, image }) => {
    const imageBase64Str = image.replace(/^.+,/, "");
    const data = new Buffer(imageBase64Str, "base64");
    imageFolder?.file(`${name}`, data);
  });
  const zipped = await zip.generateAsync({ type: "blob" });
  saveAs(zipped, "images.zip");
};

export default selectedToZip;
