import CheckCircleThinIcon from "@/components/icons/CheckCircleThinIcon";
import { FC, JSX, MouseEventHandler, ReactNode } from "react";
import styles from "./image.module.css";
type imageProps = {
  figureCss?: string;
  // onClick?: () => void;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  // selectClick?: (e: MouseEvent) => void;
  selectClick?: MouseEventHandler<HTMLImageElement> | undefined;
  id?: string;
  imgCss?: string;
  src: string;
  name: string;
  figcaptionCss?: string;
  figcaptionText?: ReactNode;
  isSelected?: boolean;
};
const Image: FC<imageProps> = ({
  figureCss,
  onClick,
  selectClick,
  id,
  imgCss,
  src,
  name,
  figcaptionCss,
  figcaptionText,
}): JSX.Element => {
  return (
    <>
      <figure
        className={[styles.figure, figureCss].join(" ")}
        onClick={onClick}
      >
        <CheckCircleThinIcon
          className={styles.checkedIcon}
          data-selected="false"
        />
        <img
          id={id}
          className={[styles.img, imgCss].join(" ")}
          src={src}
          alt={name}
          data-selected="false"
          onClick={selectClick}
        />
        <figcaption className={[styles.caption, figcaptionCss].join(" ")}>
          {figcaptionText}
        </figcaption>
      </figure>
    </>
  );
};

export default Image;
