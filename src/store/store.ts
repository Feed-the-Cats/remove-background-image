import { atom } from "jotai";

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
type imageNameType = string;
type isModalOpenType = boolean;
type modalImageType = string;
type modalNameType = string;
type isButtonDisabledType = boolean | undefined;

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
export const imageNameAtom = atom<imageNameType>("");
export const isModalOpenAtom = atom<isModalOpenType>(false);
export const modalImageAtom = atom<modalImageType>("");
export const modalNameAtom = atom<modalNameType>("");
export const isButtonDisabledAtom = atom<isButtonDisabledType>(true);
