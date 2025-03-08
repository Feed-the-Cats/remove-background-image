import { atom } from "jotai";

// type uploadedFileType = File;
type uploadedFileType = string | ArrayBuffer | null;
type imageSourceType = string | undefined;
type loadingType = number;
type loadedType = boolean;
type stateType = string;
// type processImageType = (url: string) => void;
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
// type imageNameType = string;
type ProcessedImageType = {
  image: string;
  name: string;
  width: number;
  height: number;
};
type sourceImageNameType = string;
type isModalOpenType = boolean;
type modalImageType = string;
type modalNameType = string;
type isButtonDisabledType = boolean | undefined;
type activeIdAtomType = string | null;

// Atomes Jotai
export const uploadedFileAtom = atom<uploadedFileType>(null);
export const imageSourceAtom = atom<imageSourceType>("");
export const loadingAtom = atom<loadingType>(0);
export const loadedAtom = atom<loadedType>(false);
export const stateAtom = atom<stateType>("");
// export const processImageAtom = atom<processImageType>(() => {});
export const imageAtom = atom<imageType>({
  id: "",
  image: "",
  name: "",
  width: 0,
  height: 0,
  isSelected: false,
});
export const imagesAtom = atom<imagesType>([]);
export const imageSizeAtom = atom<imageSizeType>({ width: 0, height: 0 });
// const imageNameAtom = atom<imageNameType>("");
export const processedImageAtom = atom<ProcessedImageType>({
  image: "",
  name: "",
  width: 0,
  height: 0,
});
export const sourceImageNameAtom = atom<sourceImageNameType>("");
export const processedImageNameAtom = atom<sourceImageNameType>("");
/* export const renameImageAtom = atom(
  (get) => get(sourceImageNameAtom).split(".")[0]
);*/
export const renameImageAtom = atom(
  (get) => get(sourceImageNameAtom).split(".")[0],
  (_get, set, newText: string) => set(processedImageNameAtom, newText)
);
export const isModalOpenAtom = atom<isModalOpenType>(false);
export const modalImageAtom = atom<modalImageType>("");
export const modalNameAtom = atom<modalNameType>("");
export const isButtonDisabledAtom = atom<isButtonDisabledType>(true);
export const activeIdAtom = atom<activeIdAtomType>(null);
