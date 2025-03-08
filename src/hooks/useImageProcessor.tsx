import {
  imagesAtom,
  imageSizeAtom,
  imageSourceAtom,
  loadedAtom,
  loadingAtom,
  processedImageAtom,
  processedImageNameAtom,
  sourceImageNameAtom,
  stateAtom,
  uploadedFileAtom,
} from "@/store/store";
import { Config, removeBackground } from "@imgly/background-removal";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

const useImageProcessor = () => {
  const uploadedFile = useAtomValue(uploadedFileAtom);
  const setImageSource = useSetAtom(imageSourceAtom);
  const processedImageName = useAtomValue(processedImageNameAtom);
  const imageSize = useAtomValue(imageSizeAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const setLoaded = useSetAtom(loadedAtom);
  const setState = useSetAtom(stateAtom);
  const [images, setImages] = useAtom(imagesAtom);
  const sourceImageName = useAtomValue(sourceImageNameAtom);
  const setProcessedImage = useSetAtom(processedImageAtom); // Pour mettre à jour l'image traitée

  const processImage = async (url: string) => {
    const config: Config = {
      debug: true, // Activer les logs de débogage
      progress: (key: string, current: number, total: number) => {
        setLoading(Math.round((current * 100) / total));
        key.startsWith("fetch")
          ? setState(`Fetch data ${current} of ${total}`)
          : setState(`Remove background image`);
        if (loading === 100) setLoaded(true);
      },
    };

    setImageSource(url);
    const response = await fetch(url);
    const urlToBlob = await response.blob();

    console.log("response", response);
    console.log("url", url);
    console.log("urlToBlob", urlToBlob);
    setLoaded(false);

    try {
      const img = new Image();
      const blob = await removeBackground(urlToBlob, config);
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = () => {
        console.log("reader result", reader.result);
        console.warn("reader sourceImageName", sourceImageName);
        console.warn("reader processedImageName", processedImageName);
        // const newImageName = rename(sourceImageName);
        img.onload = () => {};
        console.warn("img.onload sourceImageName", sourceImageName);
        const newImage = {
          id: `photo-${new Date().getTime()}`,
          image: reader.result as string,
          name: `${processedImageName}.png`, // newImageName,
          width: imageSize.width, // width: newImage.width,
          height: imageSize.height,
          isSelected: false,
        };
        setProcessedImage(newImage); // Mettre à jour l'image traitée
        addImage(newImage); // Ajouter l'image traitée à la liste
        setLoaded(true);
      };
    } catch (error) {
      console.error("Error removing background:", error);
      setState("Failed to remove background");
      setLoaded(false);
    }
  };

  function addImage(newImage: {
    id: string;
    image: string;
    name: string;
    width: number;
    height: number;
    isSelected: boolean;
  }) {
    // const id = `photo-${new Date().getTime()}`;
    setImages((images) => [newImage, ...images]);
    console.log("images", images);
  }

  /*   function rename(s: string) {
    console.log("rename", s.split(".")[0]);
    return `${s.split(".")[0]}.png`;
  } */

  return {
    processImage,
  };
};

export default useImageProcessor;
