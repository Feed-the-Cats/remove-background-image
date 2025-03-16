import CheckCircleThinIcon from "@/components/icons/CheckCircleThinIcon";
import { cn } from "@/lib/utils";
import { FC, JSX, MouseEventHandler, ReactNode } from "react";

type imageProps = {
  figureCss?: string;
  // onClick?: () => void;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  // selectClick?: (e: MouseEvent) => void;
  selectClick?: MouseEventHandler<HTMLImageElement> | undefined;
  onLoad?: React.ReactEventHandler<HTMLElement> | undefined;
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
  onLoad,
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
        className={cn("h-full flex flex-col relative", figureCss)}
        onClick={onClick}
      >
        <CheckCircleThinIcon
          className="fill-primary absolute top-0 right-0 m-10 w-6 h-auto hidden data-[selected=true]:block"
          data-selected="false"
        />
        <img
          id={id}
          className={cn("w-72 h-auto", imgCss)}
          src={src}
          alt={name}
          data-selected="false"
          onClick={selectClick}
          onLoad={onLoad}
        />
        <figcaption
          className={cn(
            "absolute bottom-0 left-0 right-0 min-h-12 max-h-full h-12 flex flex-col p-1.5 italic text-sm text-center text-text bg-gradient-to-t from-gradientStart to-gradientStop backdrop-blur-md",
            figcaptionCss
          )}
        >
          {figcaptionText}
        </figcaption>
      </figure>
    </>
  );
};

export default Image;
