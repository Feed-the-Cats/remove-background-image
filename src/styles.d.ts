declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.svg" {
  const src: string;
  export default src;
}

// Atoms types

type uploadedFileType = File | string | null;
// type uploadedFileType = string | ArrayBuffer | null;
type imageSourceType = string | undefined;
type loadingType = number;
type loadedType = boolean;
type stateType = string;
type imageType = {
  id: string;
  image: string;
  name: string;
  width: number;
  height: number;
  isSelected: boolean;
};
type urlImageType = {
  id?: string;
  image: string;
  name: string;
  width: number;
  height: number;
};
type sampleImagesType = {
  id?: string;
  image: string;
  name: string;
  width: number;
  height: number;
};
type imagesType = imageType[];
type imageSizeType = { width: number; height: number };
type sourceImageNameType = string;
type isModalOpenType = boolean;
type modalImageType = string;
type modalNameType = string;
type isButtonDisabledType = boolean | undefined;
type activeIdAtomType = string | null;
