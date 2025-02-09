import { FC, SVGProps } from "react";
const UploadIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 640 640"
    width={16}
    height={16}
    fill="current"
    stroke="current"
  >
    <path d="M280-480v-326L176-702l-56-58 200-200 200 200-56 58-104-104v326zM80-320q-33 0-56.5-23.5T0-400v-120h80v120h480v-120h80v120q0 33-23.5 56.5T560-320Z" />
  </svg>
);
export default UploadIcon;
