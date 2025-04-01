import { JSX, SVGProps } from "react";

type PropsType = SVGProps<SVGSVGElement>;
const UploadThinIcon = (props: PropsType): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 -960 560 560"
    {...props}
  >
    <path d="M260-536.923v-346l-93.231 93.231-28.308-28.769L280-960l141.539 141.539-28.308 28.769L300-882.923v346zM64.615-400Q37-400 18.5-418.5 0-437 0-464.615v-96.923h40v96.923q0 9.23 7.692 16.923Q55.385-440 64.615-440h430.77q9.23 0 16.923-7.692Q520-455.385 520-464.615v-96.923h40v96.923Q560-437 541.5-418.5 523-400 495.385-400Z" />
  </svg>
);
export default UploadThinIcon;
