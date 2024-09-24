import React from "react";
import { cn } from "@/lib/utils";
import { SelectProps } from "@/types/ui.types";
import { IsValid } from "../utils/formValidation";

const Select: React.FC<SelectProps> = ({
  options,
  validator,
  className,
  onChange,
  formData,
  value,
  ...props
}) => {
  const [error, setErrors] = React.useState<string>("");
  const handleChange = (name: string, value: string) => {
    onChange(name, value);
    if (validator && validator?.length) {
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
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          className
        )}
        {...props}
        value={value} // Set the selected value here
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      >
        <option value={""}>None</option>
        {options?.map((option,idx) => (
          <option
            key={idx}
            value={option.value}
            selected={option.value === value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </>
  );
};

export default Select;
