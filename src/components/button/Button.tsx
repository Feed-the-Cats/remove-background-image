import { cn } from "@/lib/utils";
import { JSX } from "react";

const Button = ({
  children,
  onClick,
  className,
  disabled,
}: JSX.IntrinsicElements["button"]) => {
  return (
    <button
      className={cn(
        "text-base font-bold inline-block w-10 h-10 mt-3 bg-transparent rounded-lg border border-primary outline-none text-primary cursor-pointer list-none select-none touch-manipulation transition-colors duration-100",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
