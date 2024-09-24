"use client";
import React, { Fragment } from "react";
import { cn } from "@/lib/utils";
import { CheckInputProps } from "@/types/ui.types";
import { IsValid } from "../utils/formValidation";
import { FormValuesType } from "../utils/formTypes";

const CheckInput: React.FC<CheckInputProps> = (props) => {
  const {
    name,
    type,
    value,
    options,
    onChange,
    formData,
    validator,
    className,
    ...rest
  } = props;
  const [error, setErrors] = React.useState<string>("");
  const formDataType = formData as FormValuesType;
  const radioChecked =
    type === "radio" &&
    (name as any) in formDataType &&
    value === (formDataType[name as string] as any);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (type === "radio") {
      onChange(name, value);
    } else {
      onChange(name, props.value, checked, type);
    }

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
    <Fragment>
      <div className="relative">
        {type === "checkbox" ? (
          <input
            {...rest}
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            checked={
              (name as any) in formDataType &&
              ((formDataType[name as string] as any).includes(value) as boolean)
            }
            className={cn(
              "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-4 h-4",
              className
            )}
          />
        ) : (
          <input
            {...rest}
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            checked={radioChecked as boolean}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-4 h-4",
              className
            )}
          />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </Fragment>
  );
};

export default CheckInput;
