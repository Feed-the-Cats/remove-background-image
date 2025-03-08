//import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";
import DropZone from "./components/dropZone/DropZone";
import Footer from "./components/footer/Footer";
import SpinnerIcon from "./components/icons/SpinnerIcon";
import Image from "./components/image/Image";
import ImageResult from "./components/imageResult/ImageResult";
//import { DropContext } from "./dropContext/dropContext.stsx";
import { useAtomValue } from "jotai";
import { DevTools } from "jotai-devtools";
import {
  imageSizeAtom,
  imageSourceAtom,
  loadedAtom,
  loadingAtom,
  sourceImageNameAtom,
  stateAtom,
} from "./store/store";

const App = () => {
  /* const { imageSource, loaded, state, imageSize, imageName } =
    useContext(DropContext); */

  const imageSource = useAtomValue(imageSourceAtom);
  const loading = useAtomValue(loadingAtom);
  const loaded = useAtomValue(loadedAtom);
  const state = useAtomValue(stateAtom);
  const imageSize = useAtomValue(imageSizeAtom);
  //const imageName = useAtomValue(imageNameAtom);
  const sourceImageName = useAtomValue(sourceImageNameAtom);

  const { width, height } = imageSize;
  /* const captionStyles = [
    styles.captionTransition,
    loaded === false ? styles.isLoaded : "",
  ].join(" "); */

  return (
    <div className={styles.App}>
      <DevTools />
      <DropZone />
      <p style={{ color: "white" }}>{loading}</p>
      <p style={{ color: "white" }}>{state}</p>
      <p style={{ color: "white" }}>{`${loaded}`}</p>
      {imageSource ? (
        <Image
          {...{
            src: imageSource,
            name: sourceImageName,
            figcaptionCss: [
              styles.captionTransition,
              loaded === false ? styles.isLoaded : "",
            ].join(" "),
            figcaptionText: (
              <>
                <div>
                  <p>Name : {sourceImageName}</p>
                  <p>
                    Sise w : {width} - h : {height}
                  </p>
                </div>
                <div
                  className={
                    height > width
                      ? styles.buttonsContainerVertical
                      : styles.buttonsContainerHorizontal
                  }
                >
                  <div
                    className={loaded === true ? styles.noDisplayLoader : ""}
                  >
                    <p style={{ marginBottom: "20px" }}>{state}</p>
                    <SpinnerIcon
                      color1="var(--primary)"
                      color2="var(--spinnerColor2)"
                      color3="var(--spinnerColor3)"
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
