import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, JSX } from "react";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({
  children,
  onClick,
  className,
  disabled,
}: ButtonType): JSX.Element => {
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
