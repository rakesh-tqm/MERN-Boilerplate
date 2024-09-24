import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/ui.types";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type = "button",
  className,
  children,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "submit":
        return "bg-blue-500 text-white";
      case "primary":
        return "bg-green-500 text-white";
      case "secondary":
        return "bg-gray-500 text-white";
      case "link":
        return "bg-cyan-400 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  return (
    <button
      {...props}
      type={type}
      className={cn(
        `flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${getButtonStyle()}`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
