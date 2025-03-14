import { filterSelectedImages } from "@/store/store";
import { saveAs } from "file-saver";
import { useAtom } from "jotai";
import JSZip from "jszip";

const selectedToZip = async () => {
  /*   const selectedImages = images.filter(({ isSelected }) => isSelected === true);*/
  const [selectedImages] = useAtom(filterSelectedImages);

  const zip = new JSZip();
  const imageFolder = zip.folder("images");
  selectedImages.forEach((itemAtom) => {
    const [item] = useAtom(itemAtom);
    const { image, name } = item;
    const imageBase64Str = image.replace(/^.+,/, "");
    const data = new Buffer(imageBase64Str, "base64");
    imageFolder?.file(`${name}`, data);
  });
  const zipped = await zip.generateAsync({ type: "blob" });
  saveAs(zipped, "images.zip");
};

export default selectedToZip;
