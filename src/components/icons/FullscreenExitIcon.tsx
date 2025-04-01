import { JSX, SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement>;
const FullscreenExitIcon = (props: PropsType): JSX.Element => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 720 720"
    height={18}
    width={18}
    fill="current"
    stroke="current"
  >
    <path
      d="M 120,-240 V -360 H 0 v -80 h 200 v 200 z m 400,0 v -200 h 200 v 80 H 600 v 120 z M 0,-760 v -80 h 120 v -120 h 80 v 200 z m 520,0 v -200 h 80 v 120 h 120 v 80 z"
      id="path1"
    />
  </svg>
);
export default FullscreenExitIcon;
