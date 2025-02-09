import { FC, SVGProps } from "react";
type SpinnerColorsType = {
  color1?: string;
  color2?: string;
  color3?: string;
};
/* const SpinnerIcon = (
  {
    color1 = "#bbbb88",
    color2 = "#eeaa88",
    color3 = "#eedd99"
  }: SpinnerColorsType,
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={50}
    height={50}
    xmlSpace="preserve"
  >
    <path
      fill={color1}
      d="M31.6 3.5C5.9 13.6-6.6 42.7 3.5 68.4c10.1 25.7 39.2 38.3 64.9 28.1l-3.1-7.9C44 97 19.9 86.6 11.5 65.3c-8.4-21.3 2-45.4 23.3-53.8l-3.2-8z"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        dur="2s"
        from="0 50 50"
        repeatCount="indefinite"
        to="-360 50 50"
        type="rotate"
      />
    </path>
    <path
      fill={color2}
      d="M82 35.7C74.1 18 53.4 10.1 35.7 18S10.1 46.6 18 64.3l7.6-3.4c-6-13.5 0-29.3 13.5-35.3s29.3 0 35.3 13.5l7.6-3.4z"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        dur="1s"
        from="0 50 50"
        repeatCount="indefinite"
        to="360 50 50"
        type="rotate"
      />
    </path>
    <path
      fill={color3}
      d="M42.3 39.6c5.7-4.3 13.9-3.1 18.1 2.7 4.3 5.7 3.1 13.9-2.7 18.1l4.1 5.5c8.8-6.5 10.6-19 4.1-27.7-6.5-8.8-19-10.6-27.7-4.1l4.1 5.5z"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        dur="0.6s"
        from="0 50 50"
        repeatCount="indefinite"
        to="-360 50 50"
        type="rotate"
      />
    </path>
  </svg>
);
export default SpinnerIcon;
 */

const SpinnerIcon: FC<SpinnerColorsType & SVGProps<SVGSVGElement>> = (
  props
) => {
  const { color1, color2, color3, ...rest } = props;
  return (
    <svg
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={50}
      height={50}
      xmlSpace="preserve"
    >
      <path
        fill={color1}
        d="M31.6 3.5C5.9 13.6-6.6 42.7 3.5 68.4c10.1 25.7 39.2 38.3 64.9 28.1l-3.1-7.9C44 97 19.9 86.6 11.5 65.3c-8.4-21.3 2-45.4 23.3-53.8l-3.2-8z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="2s"
          from="0 50 50"
          repeatCount="indefinite"
          to="-360 50 50"
          type="rotate"
        />
      </path>
      <path
        fill={color2}
        d="M82 35.7C74.1 18 53.4 10.1 35.7 18S10.1 46.6 18 64.3l7.6-3.4c-6-13.5 0-29.3 13.5-35.3s29.3 0 35.3 13.5l7.6-3.4z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="1s"
          from="0 50 50"
          repeatCount="indefinite"
          to="360 50 50"
          type="rotate"
        />
      </path>
      <path
        fill={color3}
        d="M42.3 39.6c5.7-4.3 13.9-3.1 18.1 2.7 4.3 5.7 3.1 13.9-2.7 18.1l4.1 5.5c8.8-6.5 10.6-19 4.1-27.7-6.5-8.8-19-10.6-27.7-4.1l4.1 5.5z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="0.6s"
          from="0 50 50"
          repeatCount="indefinite"
          to="-360 50 50"
          type="rotate"
        />
      </path>
    </svg>
  );
};
export default SpinnerIcon;
