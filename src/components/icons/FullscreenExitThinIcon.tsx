import { JSX, SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement>;
const FullscreenExitThinIcon = (props: PropsType): JSX.Element => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 640 640"
    width={16}
    height={16}
    fill="current"
    stroke="current"
  >
    <path d="M136.759-320v-136.923H0v-40h176.71V-320Zm326.53 0v-176.923H640v40H503.241V-320ZM0-783.077v-40h136.759V-960h39.952v176.923zm463.29 0V-960h39.951v136.923H640v40z" />
  </svg>
);
export default FullscreenExitThinIcon;
