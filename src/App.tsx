//import { useContext } from "react";
import { useAtom, useAtomValue } from "jotai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropZone from "./components/dropZone/DropZone";
import Footer from "./components/footer/Footer";
import SpinnerIcon from "./components/icons/SpinnerIcon";
import Image from "./components/image/Image";
import ImageResult from "./components/imageResult/ImageResult";
import { cn } from "./lib/utils";
import {
  imageSizeAtom,
  imageSourceAtom,
  loadedAtom,
  loadingAtom,
  sourceImageNameAtom,
  stateAtom,
} from "./store/store";

import { colors } from "../tailwind.config";

const App = () => {
  const [imageSource] = useAtom(imageSourceAtom);
  const [loading] = useAtom(loadingAtom);
  const [loaded] = useAtom(loadedAtom);
  const [state] = useAtom(stateAtom);
  const [imageSize] = useAtom(imageSizeAtom);
  const sourceImageName = useAtomValue(sourceImageNameAtom);
  const { width, height } = imageSize;

  return (
    <div
      className={
        "w-screen min-h-screen flex flex-col items-center justify-center gap-16 bg-paper"
      }
    >
      <DropZone />
      {imageSource ? (
        <Image
          {...{
            src: imageSource,
            name: sourceImageName,
            figcaptionCss: cn(
              "overflow-hidden transition-all duration-1000",
              loaded ? "" : "h-full"
            ),
            figcaptionText: (
              <>
                <div>
                  <p>Name : {`${sourceImageName}`}</p>
                  <p>
                    Sise w : {width} - h : {height}
                  </p>
                </div>
                <div
                  className={cn(
                    height > width
                      ? "w-64 h-full border-2 border-primary mx-auto my-5 flex flex-col justify-center gap-5"
                      : "w-64 h-auto border-2 border-primary mx-auto my-auto flex flex-row justify-center gap-5 items-center"
                  )}
                >
                  <div
                    className={cn(
                      "flex flex-col items-center",
                      loaded ? "hidden" : ""
                    )}
                    style={{
                      opacity: loaded ? 0 : 1,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    <p style={{ marginBottom: "1.25rem" }}>{state}</p>
                    <SpinnerIcon
                      color1={colors.primary}
                      color2={colors.spinnerColor2}
                      color3={colors.spinnerColor3}
                    />
                  </div>
                </div>
              </>
            ),
          }}
        />
      ) : null}
      <ImageResult />
      <ToastContainer />
      <Footer />
    </div>
  );
};
export default App;
