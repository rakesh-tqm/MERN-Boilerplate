"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { IsValid } from "../utils/formValidation";
import { TextAreaProps } from "@/types/ui.types";

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  validator,
  className,
  ...props
}) => {
  const [error, setErrors] = useState("");

  const handleChange = (name: string, value: string) => {
    onChange(name, value);
    if (validator && validator.length) {
      let validRes = IsValid(validator, value, name);

      if (typeof validRes === "string") {
        setErrors(validRes);
      } else {
        setErrors("");
      }
    }
  };

  return (
    <>
      <div className="relative">
        <textarea
          className={cn(
            "flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            className
          )}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={value || ""}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

export default TextArea;
