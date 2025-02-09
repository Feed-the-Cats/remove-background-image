import imglyRemoveBackground, { Config } from "@imgly/background-removal";
import { Signal, signal } from "@preact/signals-react";
import { PropsWithChildren, createContext, useCallback } from "react";

type uploadedFileType = string | ArrayBuffer | null;
type imageSourceType = string | undefined;
type loadingType = number;
type loadedType = boolean;
type stateType = string;
type processImageType = (url: string) => void;
type imageType = {
  id: string;
  image: string;
  name: string;
  width: number;
  height: number;
  isSelected: boolean;
};
type imagesType = imageType[];
type imageSizeType = { width: number; height: number };
type imageNameType = string;
type isModalOpenType = boolean;
type modalImageType = string;
type modalNameType = string;
type isButtonDisabledType = boolean | undefined;

type DropContextType = {
  uploadedFile: Signal<uploadedFileType>;
  imageSource: Signal<imageSourceType>;
  loading: Signal<loadingType>;
  loaded: Signal<loadedType>;
  state: Signal<stateType>;
  processImage: Signal<processImageType>;
  image: Signal<imageType>;
  images: Signal<imagesType>;
  imageSize: Signal<imageSizeType>;
  imageName: Signal<imageNameType>;
  isModalOpen: Signal<isModalOpenType>;
  modalImage: Signal<modalImageType>;
  modalName: Signal<modalNameType>;
  isButtonDisabled: Signal<isButtonDisabledType>;
};

const uploadedFile = signal<uploadedFileType>("");
const imageSource = signal<imageSourceType>("");
const loading = signal<loadingType>(0);
const loaded = signal<loadedType>(false);
const state = signal<stateType>("");
const processImage = signal<processImageType>((url) => {});
const image = signal<imageType>({
  id: "",
  image: "",
  name: "",
  width: 0,
  height: 0,
  isSelected: false,
});
const images = signal<imagesType>([]);
const imageSize = signal<imageSizeType>({
  width: 0,
  height: 0,
});
const imageName = signal<imageNameType>("");
const isModalOpen = signal<isModalOpenType>(false);
const modalImage = signal<modalImageType>("");
const modalName = signal<modalNameType>("");
const isButtonDisabled = signal<isButtonDisabledType>(true);

const setContext: DropContextType = {
  uploadedFile,
  imageSource,
  loading,
  loaded,
  state,
  processImage,
  image,
  images,
  imageSize,
  imageName,
  isModalOpen,
  modalImage,
  modalName,
  isButtonDisabled,
};

const DropContext = createContext<DropContextType>(setContext);

const addImage = (img: string) => {
  const { width, height } = imageSize.value;
  const id = `photo-${new Date().getTime()}`;
  images.value = [
    {
      id: id,
      image: img,
      name: imageName.value,
      width: width,
      height: height,
      isSelected: false,
    },
    ...images.value,
  ];
  /*   let timeoutScroll = setTimeout(() => document
        .querySelector(`#${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" }),500);

    if (document.querySelector(`#${id}`)) {
        console.log("clear timeout", timeoutScroll)
    clearTimeout(timeoutScroll)
  } */
};

const rename = (s: string) => `${s.split(".")[0]}.png`;

const DropContextProvider = ({ children }: PropsWithChildren) => {
  const processedImage = useCallback(async (url: string) => {
    //let processInterval = setInterval(() =>  loading.value += 1, 1000);
    const config: Config = {
      fetchArgs: {
        mode: "no-cors",
      },
      progress: (key: string, current: number, total: number) => {
        // loading.value = Math.round((current * 100) / total);
        key.startsWith("fetch")
          ? (state.value = `Fetch data ${current} of ${total}`)
          : (state.value = `Remove background image`);
        //const [type, suptype] = key.split(":");
        /* console.log("key", key, "total", total - current); */
        //console.log(`${type}---${suptype}: ${current} of ${total}`);
        //if (loading.value === 100) loaded.value = true;
      },
    };

    imageSource.value = url;
    const response = await fetch(url);
    const urlToBlob = await response.blob();
    console.log("urlToBlob", urlToBlob);
    loaded.value = false;
    //console.warn("loaded false?", loaded.value);
    imglyRemoveBackground(urlToBlob, config).then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onload = () => {
        imageName.value = rename(imageName.value);
        addImage(reader.result as string);
        loaded.value = true;
        //clearInterval(processInterval)
        //console.warn("loaded OK?", loaded.value);
      };

      /* const imgRemovedBackgroundUrl = URL.createObjectURL(blob);
      addImage(imgRemovedBackgroundUrl); */
    });

    /*     let imageFromRemoveBackground;
    try {
      imageFromRemoveBackground = await imglyRemoveBackground(
        urlToBlob,
        config
      );
    } catch (error) {
      console.log("error", error);
    }
    console.log("imgRemovedBackgroundUrl", imgRemovedBackgroundUrl.value)
    imgRemovedBackgroundUrl.value = URL.createObjectURL(
      imageFromRemoveBackground
    ) */
  }, []);

  uploadedFile.value = null;
  imageSource.value = "";
  loading.value = 0;
  loaded.value = false;
  state.value = "";
  processImage.value = processedImage;
  images.value = [];
  image.value = {
    id: "",
    image: "",
    name: "",
    width: 0,
    height: 0,
    isSelected: false,
  };
  imageSize.value = { width: 0, height: 0 };
  imageName.value = "";
  isModalOpen.value = false;
  modalImage.value = "";
  modalName.value = "";
  isButtonDisabled.value = true;
  return (
    <DropContext.Provider
      value={{
        uploadedFile,
        imageSource,
        loading,
        loaded,
        state,
        processImage,
        images,
        image,
        imageSize,
        imageName,
        isModalOpen,
        modalImage,
        modalName,
        isButtonDisabled,
      }}
    >
      {children}
    </DropContext.Provider>
  );
};

export { DropContext, DropContextProvider };
//export type {imagesType}
