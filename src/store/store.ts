import { rename } from "@/lib/rename";
import { Config, removeBackground } from "@imgly/background-removal";
import { atom } from "jotai";
import { atomEffect } from "jotai-effect";
import { splitAtom } from "jotai/utils";

// Atomes Jotai
export const uploadedFileAtom = atom<uploadedFileType>(null);
export const imageSourceAtom = atom<imageSourceType>("");
export const loadingAtom = atom<loadingType>(0);
export const loadedAtom = atom<loadedType>(false);
export const stateAtom = atom<stateType>("");
export const sampleImagesAtom = atom<sampleImagesType[]>([
  {
    id: "imageSample1",
    image:
      "https://images.unsplash.com/photo-1700235120867-3517dbe5dd52?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "photo-1700235120867-3517dbe5dd52.jpg",
    width: 1922,
    height: 2643,
  },
  {
    id: "imageSample2",
    image:
      "https://images.unsplash.com/photo-1699111386434-5573b25c6cb4?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "photo-1699111386434-5573b25c6cb4.jpg",
    width: 2400,
    height: 3600,
  },
  {
    id: "imageSample3",
    image:
      "https://images.unsplash.com/photo-1699378999301-8c88a6a237d9?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "photo-1699378999301-8c88a6a237d9.jpg",
    width: 2400,
    height: 3600,
  },
  {
    id: "imageSample4",
    image:
      "https://images.unsplash.com/photo-1698668768670-724213a9907e?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "photo-1698668768670-724213a9907e.jpg",
    width: 2400,
    height: 2999,
  },
  {
    id: "imageSample5",
    image:
      "https://images.unsplash.com/photo-1698591020373-6a183ba43308?q=80&w=1360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "photo-1698591020373-6a183ba43308.jpg",
    width: 2400,
    height: 3667,
  },
]);
export const imageAtom = atom<imageType>({
  id: "",
  image: "",
  name: "",
  width: 0,
  height: 0,
  isSelected: false,
});
export const imagesAtom = atom<imagesType>([]);
export const splitedImagesAtom = splitAtom(imagesAtom, (image) => image.id);
export const imageSizeAtom = atom<imageSizeType>({ width: 0, height: 0 });
export const sourceImageNameAtom = atom<sourceImageNameType>("");
export const processedImageNameAtom = atom<sourceImageNameType>("");
export const processedImageAtom = atom<imageSourceType>("");
export const isModalOpenAtom = atom<isModalOpenType>(false);
export const modalImageAtom = atom<modalImageType>("");
export const modalNameAtom = atom<modalNameType>("");
export const isButtonDisabledAtom = atom<isButtonDisabledType>(true);
export const activeIdAtom = atom<activeIdAtomType>(null);

export const originalImageEffect = atomEffect((get, set) => {
  const uploadedFile = get(uploadedFileAtom);
  if (!uploadedFile) return;

  if (typeof uploadedFile === "string") {
    set(imageSourceAtom, uploadedFile);
  } else {
    const name = uploadedFile.name;
    const img = new Image();
    const reader = new FileReader();
    set(sourceImageNameAtom, name);
    reader.onload = () => {
      const result = reader.result as string;
      img.onload = () => {
        set(imageSizeAtom, { width: img.width, height: img.height });
      };
      img.src = result;
      set(imageSourceAtom, result);
    };
    reader.readAsDataURL(uploadedFile);
  }
});

const addImage = atom(null, (get, set) => {
  const currentImages = get(imagesAtom);
  const image = get(processedImageAtom);
  const name = get(processedImageNameAtom);
  const imageSize = get(imageSizeAtom);
  const { width, height } = imageSize;
  const id = `photo-${new Date().getTime()}`;
  if (image) {
    const newImage = {
      id,
      image,
      name,
      width,
      height,
      isSelected: false,
    };
    set(imagesAtom, [newImage, ...currentImages]);
  }
});

export const processAndAddImageAtom = atom(null, (get, set) => {
  const imageSource = get(imageSourceAtom);
  const name = get(sourceImageNameAtom);
  const loading = get(loadingAtom);

  if (!imageSource) return;

  const processImage = async (source: imageSourceType) => {
    const config: Config = {
      debug: true, // Activer les logs de débogage
      device: "gpu", // Utiliser le GPU pour le traitement
      output: {
        format: "image/png",
        quality: 0.8,
      },
      progress: (key: string, current: number, total: number) => {
        set(loadingAtom, Math.round((current * 100) / total));
        key.startsWith("fetch")
          ? set(stateAtom, `Fetch data ${current} of ${total}`)
          : set(stateAtom, `Remove background image`);
        if (loading === 100) set(loadedAtom, true);
      },
    };

    set(loadedAtom, false);
    removeBackground(source, config).then((blob: Blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        set(processedImageNameAtom, rename(name));
        set(processedImageAtom, reader.result as string);

        // Utiliser addImage ici
        set(addImage); // Appeler set sur addImage pour ajouter la nouvelle image
        set(loadedAtom, true);
      };
    });
  };
  processImage(imageSource);
});

export const processImageEffect = atomEffect((get, set) => {
  const imageSource = get(imageSourceAtom);
  if (imageSource) set(processAndAddImageAtom); // Déclencher processAndAddImageAtom
});

export const filterSelected = atom((get) => {
  const atoms = get(splitedImagesAtom);
  return (
    atoms.filter((imageAtom) => {
      const isSelected = get(imageAtom).isSelected;
      return isSelected === true;
    }).length >= 1
  );
});

export const filterSelectedImages = atom((get) => {
  const atoms = get(splitedImagesAtom);
  return atoms.filter((imageAtom) => {
    const image = get(imageAtom);
    return image.isSelected === true;
  });
});
