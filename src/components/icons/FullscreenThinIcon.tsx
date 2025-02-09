import { FC, SVGProps } from "react";

const FullscreenThinIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 640 640"
    width={16}
    height={16}
    fill="current"
    stroke="current"
  >
    <path
      d="M0-320v-176.923h39.952V-360h136.759v40zm463.29 0v-40h136.758v-136.923H640V-320ZM0-783.077V-960h176.71v40H39.953v136.923zm600.048 0V-920H463.289v-40H640v176.923z"
      style={{
        strokeWidth: 0.9994,
      }}
    />
  </svg>
);
export default FullscreenThinIcon;
