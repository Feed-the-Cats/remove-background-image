import { useAtom, type PrimitiveAtom } from "jotai";

const useImageState = (imageAtom: PrimitiveAtom<imageType>) => {
  const [value, setValue] = useAtom(imageAtom);
  return { value, setValue };
};

export default useImageState;
