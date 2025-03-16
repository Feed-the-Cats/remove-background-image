export const rename = (s: string) => `${s.split(".")[0]}.png`;

/* export const addImage = (image: string) => {
  const [imageSize] = useAtom<imageSizeType>(imageSizeAtom);
  const [name] = useAtom<sourceImageNameType>(processedImageNameAtom);
  const [, dispatch] = useAtom(splitedImagesAtom);
  const { width, height } = imageSize;
  const id = `photo-${new Date().getTime()}`;

  const newImage = {
    id,
    image,
    name,
    width,
    height,
    isSelected: false,
  };

  console.log("newImage", newImage);

  dispatch({
    type: "insert",
    value: newImage,
  });
};
 */
