import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types/ui.types";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IsValid } from "@/common/utils/formValidation";

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  className,
  validator,
  showPassword,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setErrors] = useState<string>("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleChange = (name: string, value: string) => {
    onChange(name, value);

    if (validator && validator.length) {
      let validRes = IsValid(validator, value, name);
      setErrors(typeof validRes === "string" ? validRes : "");
    }
  };

  return (
    <>
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            className
          )}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={value ?? ""}
          {...props}
        />
        {showPassword &&
          (isPasswordVisible ? (
            <FaEyeSlash
              className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer w-[20px]"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FaEye
              className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer w-[20px]"
              onClick={togglePasswordVisibility}
            />
          ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

Input.displayName = "Input";

export { Input };
