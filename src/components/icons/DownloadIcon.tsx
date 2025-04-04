import { JSX, SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement>;
const DownloadIcon = (props: PropsType): JSX.Element => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 940 940"
    width={16}
    height={16}
    fill="current"
    stroke="current"
  >
    <path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
  </svg>
);
export default DownloadIcon;
