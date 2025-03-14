//import { useContext } from "react";
import { useAtom, useAtomValue } from "jotai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";
import DropZone from "./components/dropZone/DropZone";
import Footer from "./components/footer/Footer";
import SpinnerIcon from "./components/icons/SpinnerIcon";
import Image from "./components/image/Image";
import ImageResult from "./components/imageResult/ImageResult";
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

  const [imageSource] = useAtom(imageSourceAtom);
  const [loading] = useAtom(loadingAtom);
  const [loaded] = useAtom(loadedAtom);
  const [state] = useAtom(stateAtom);
  const [imageSize] = useAtom(imageSizeAtom);
  //const imageName = useAtomValue(imageNameAtom);
  const sourceImageName = useAtomValue(sourceImageNameAtom);

  const { width, height } = imageSize;
  /* const captionStyles = [
    styles.captionTransition,
    loaded === false ? styles.isLoaded : "",
  ].join(" "); */

  console.log("Loaded state:", loaded);
  return (
    <div className={styles.App}>
      <DropZone />
      {/*       <p style={{ color: "white" }}>{loading}</p>
      <p style={{ color: "white" }}>{state}</p>
      <p style={{ color: "white" }}>{`${loaded}`}</p> */}
      {imageSource ? (
        <Image
          {...{
            src: imageSource,
            name: sourceImageName,
            figcaptionCss: `${styles.captionTransition} ${
              !loaded ? styles.isLoaded : ""
            }`,
            figcaptionText: (
              <>
                <div>
                  <p>Name : {`${sourceImageName}`}</p>
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
                    className={!loaded ? "" : styles.noDisplayLoader}
                    style={{
                      opacity: loaded ? 0 : 1,
                      transition: "opacity 0.3s ease-in-out",
                    }}
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
