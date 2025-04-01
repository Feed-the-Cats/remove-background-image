import ImageItem from "@/components/imageItem/ImageItem";
import { JSX, useEffect } from "react";
//import CheckCircleThinIcon from "../icons/CheckCircleThinIcon";
import ImageModal from "@/components/imagemodal/ImageModal";
import { useFirstImage } from "@/hooks/useFirstImage";
import useScrollToActiveImage from "@/hooks/useScrollToActiveImage";
import selectedToZip from "@/lib/selecImagesForZip";
import {
  activeIdAtom,
  filterSelected,
  isButtonDisabledAtom,
  isModalOpenAtom,
  loadedAtom,
  loadingAtom,
  modalImageAtom,
  modalNameAtom,
  splitedImagesAtom,
} from "@/store/store";
import { useAtom } from "jotai";
import Button from "../button/Button";

const ImageResult = (): JSX.Element => {
  const [splitedImages] = useAtom(splitedImagesAtom);
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [isButtonDisabled, setIsButtonDisabled] = useAtom(isButtonDisabledAtom);
  const [, setModalImage] = useAtom(modalImageAtom);
  const [, setModalName] = useAtom(modalNameAtom);
  const [, setActiveId] = useAtom(activeIdAtom);
  const [filtered] = useAtom(filterSelected);
  const [loading] = useAtom(loadingAtom);
  const [loaded] = useAtom(loadedAtom);
  const firstImage = useFirstImage(splitedImages);

  setIsButtonDisabled(!filtered);

  useEffect(() => {
    if (firstImage) {
      setActiveId(firstImage.id);
    }
  }, [firstImage, setActiveId]);

  useScrollToActiveImage();

  return (
    <>
      {!!splitedImages.length && (
        <>
          <h1 className="font-extralight text-titleH1 text-text">Gallery</h1>{" "}
          <Button
            className="w-auto h-10 px-4 disabled:bg-buttonHover disabled:cursor-not-allowed"
            onClick={() => selectedToZip()}
            disabled={isButtonDisabled}
          >
            Download all selected as zip
          </Button>
        </>
      )}
      <div className="w-full h-auto flex flex-row flex-wrap justify-center items-end gap-2.5">
        {splitedImages.map((imageAtom) => (
          <ImageItem
            key={imageAtom.toString()}
            imageAtom={imageAtom}
            setModalImage={setModalImage}
            setModalName={setModalName}
            setIsModalOpen={setIsModalOpen}
            imgCss="transition-all duration-1000 cursor-pointer data-[selected=true]:w-60 data-[selected=true]:m-8 data-[selected=true]:border data-[selected=true]:border-primary"
            figcaptionCss="h-24 overflow-hidden cursor-n-resize transition-all duration-1000 hover:h-full"
            buttonsContainerVerticalCss="w-64 h-[362px] border-2 border-primary mx-auto my-5 flex flex-col justify-center gap-5"
            buttonsContainerHorizontalCss="w-64 h-[362px] border-2 border-primary mx-auto my-5 flex flex-row justify-center gap-5 items-center"
          />
        ))}
      </div>
      {isModalOpen && <ImageModal />}
    </>
  );
};

export default ImageResult;
