"use client";
import React from "react";
import Select from "@/common/ui/Select";
import { Input } from "@/common/ui/Input";
import TextArea from "@/common/ui/Textarea";
import CheckInput from "@/common/ui/CheckInput";
import { GetFieldElementProps } from "@/types/customField.types";
import { ValidatorType } from "@/types/common/index.type";

const GetFieldElement: React.FC<GetFieldElementProps> = ({
  type,
  label,
  options,
  onChange,
  validator,
  formValues,
}) => {
  const selectOptions = options.map((o) => ({
    value: o.value,
    label: o.label,
  }));

  const customType = type.trim();
  const customLabel = label.trim();
  const condition = customType && customLabel;

  if (condition) {
    switch (customType) {
      case "textarea":
        return (
          <TextArea
            id={customLabel}
            name={customLabel}
            onChange={onChange}
            validator={validator as ValidatorType[]}
            value={formValues[customLabel] as string}
          />
        );
      case "select":
        return (
          <Select
            id={customLabel}
            name={customLabel}
            onChange={onChange}
            formData={formValues}
            options={selectOptions}
            validator={validator as ValidatorType[]}
            value={formValues[customLabel] as string}
          />
        );
      case "checkbox":
      case "radio":
        let checkData =
          options &&
          options.map((data) => {
            return (
              <div key={customLabel}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center h-5">
                    <div className="relative">
                      <div className="flex items-center">
                        <CheckInput
                          type={type}
                          name={customLabel}
                          options={options}
                          value={data.value}
                          onChange={onChange}
                          formData={formValues}
                          validator={validator as ValidatorType[]}
                        />
                      </div>
                    </div>
                  </div>
                  <label
                    className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-6 text-gray-900"
                    htmlFor="terms"
                  >
                    {data?.label}
                  </label>
                </div>
              </div>
            );
          });
        return checkData;
      default:
        return (
          <Input
            id={customLabel}
            name={customLabel}
            onChange={onChange}
            validator={validator as ValidatorType[]}
            value={formValues[customLabel] as string}
          />
        );
    }
  }
};

export default GetFieldElement;
