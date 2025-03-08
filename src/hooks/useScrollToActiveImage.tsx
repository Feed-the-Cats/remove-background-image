// useScrollToActiveImage.ts
import { activeIdAtom } from "@/store/store";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

const useScrollToActiveImage = () => {
  const activeId = useAtomValue(activeIdAtom);

  useEffect(() => {
    if (activeId) {
      const element = document.querySelector(`#${activeId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeId]); // Déclencher l'effet lorsque `activeId` change
};

export default useScrollToActiveImage;
