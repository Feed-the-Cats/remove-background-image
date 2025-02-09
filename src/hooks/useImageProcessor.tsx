import {
  imageNameAtom,
  imagesAtom,
  imageSizeAtom,
  imageSourceAtom,
  loadedAtom,
  loadingAtom,
  stateAtom,
} from "@/store/store";
import imglyRemoveBackground, { Config } from "@imgly/background-removal";
import { useAtom } from "jotai";

const useImageProcessor = () => {
  // const [uploadedFile, setUploadedFile] = useAtom(uploadedFileAtom);
  const [imageSource, setImageSource] = useAtom(imageSourceAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [loaded, setLoaded] = useAtom(loadedAtom);
  const [state, setState] = useAtom(stateAtom);
  const [images, setImages] = useAtom(imagesAtom);
  const [imageSize, setImageSize] = useAtom(imageSizeAtom);
  const [imageName, setImageName] = useAtom(imageNameAtom);

  const processImage = async (url: string) => {
    const config: Config = {
      fetchArgs: {
        mode: "no-cors",
      },
      progress: (key: string, current: number, total: number) => {
        key.startsWith("fetch")
          ? setState(`Fetch data ${current} of ${total}`)
          : setState(`Remove background image`);
      },
    };

    setImageSource(url);
    const response = await fetch(url);
    const urlToBlob = await response.blob();

    console.log("response", response);
    console.log("url", url);
    console.log("urlToBlob", urlToBlob);
    setLoaded(false);

    imglyRemoveBackground(urlToBlob, config).then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = () => {
        console.log("reader result", reader.result);
        setImageName(rename(imageName));
        addImage(reader.result as string);
        setLoaded(true);
      };
    });
  };

  function addImage(img: string) {
    const { width, height } = imageSize;
    const id = `photo-${new Date().getTime()}`;
    setImages([
      {
        id: id,
        image: img,
        name: imageName,
        width: width,
        height: height,
        isSelected: false,
      },
      ...images,
    ]);
    console.log("images", images);
  }

  function rename(s: string) {
    return `${s.split(".")[0]}.png`;
  }

  return {
    imageSource,
    loading,
    loaded,
    state,
    images,
    imageSize,
    imageName,
    processImage,
  };
};

export default useImageProcessor;
