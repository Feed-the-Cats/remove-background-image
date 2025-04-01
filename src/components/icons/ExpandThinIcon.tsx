import { JSX, SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement>;
const ExpandThinIcon = (props: PropsType): JSX.Element => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 423.52 240"
    width={10.588}
    height={6}
    fill="current"
    stroke="current"
  >
    <path
      d="M28.231-720-.004-748.236 211.76-960l211.764 211.764L395.29-720 211.76-903.529Z"
      style={{
        strokeWidth: 0.99744,
      }}
    />
  </svg>
);
export default ExpandThinIcon;
