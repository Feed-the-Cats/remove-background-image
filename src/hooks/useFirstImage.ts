import { type PrimitiveAtom, atom, useAtom } from "jotai";

const dummyAtom = atom<imageType | null>(null);

export const useFirstImage = (images: PrimitiveAtom<imageType>[]) => {
  const [firstImage] = useAtom(images[0] || dummyAtom);
  return images.length > 0 ? firstImage : undefined;
};
