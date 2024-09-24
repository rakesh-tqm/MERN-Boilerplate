"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CheckInputProps, RadioButtonProps } from "@/types/ui.types";
import { IsValid } from "../utils/formValidation";
import { useAppDispatch } from "@/lib/hooks";

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  name,
  formData,
  options,
  onChange,
  className,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = React.useState(value);
  const [error, setErrors] = React.useState<string>("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    onChange(name, value);

    // if (validator && validator.length) {
    //   let validRes = IsValid(validator, value, name);

    //   if (typeof validRes === "string") {
    //     setErrors(validRes);
    //   } else {
    //     setErrors("");
    //   }
    // }
  };

  const isChecked = options?.some((opt: any) => opt.value === formData.name);

  return (
    <>
      <div className="relative">
        <input
          type="radio"
          checked={isChecked}
          onChange={handleCheckboxChange}
          {...props}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            className
          )}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

export default RadioButton;
