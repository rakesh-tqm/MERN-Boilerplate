"use client";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Option } from "@/types/customField.types";
import { MdAdd, MdOutlineDelete } from "react-icons/md";
import { setField, setFieldOptions } from "./customFieldSlice";
import { cn } from "@/lib/utils";
import { IsValid, validateDate } from "@/common/utils/formValidation";

interface PropsType {
  values: Option;
  showOptions?: boolean;
  options?: Option[] | [];
}

type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

const CustomOption: React.FC<PropsType> = ({ values }) => {
  const { fieldOptions } = useAppSelector((state) => state.customField);
  const [errors, setErrors] = useState({ label: "", value: "" });
  const [formValues, setFormValues] = useState(values);
  const dispatch = useAppDispatch();

  const changeHandler: OnChange = (e) => {
    const { name, value } = e.target;
    const optionValues = { ...formValues, [name]: value };
    const updatedOptions = fieldOptions.map((option) =>
      option.id === formValues.id ? optionValues : option
    );
    let validRes = IsValid([{ name: "IsRequired" }], value, name);
    const errorMessage = typeof validRes === "string" ? validRes : "";
    setErrors({ ...errors, [name]: errorMessage });
    dispatch(setFieldOptions(updatedOptions));
    setFormValues(optionValues);
  };

  const deleteOption = (id: string) => {
    dispatch(setFieldOptions(fieldOptions.filter((o: Option) => o.id !== id)));
  };

  const classnames = cn(
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-1"
  );

  const errorClass = "text-xs ml-1 text-red-500";

  return (
    <div className="flex justify-between gap-3 mt-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="firstLabel">Add Options</Label>
          <MdOutlineDelete
            className="cursor-pointer text-[20px]"
            onClick={() => deleteOption(formValues.id)}
          />
        </div>
        <div>
          <div>
            <input
              type="text"
              name="label"
              className={classnames}
              value={formValues.label}
              onChange={changeHandler}
              placeholder="Enter option label"
            />
            {errors.label && <p className={errorClass}>{errors.label}</p>}
          </div>
          <div>
            <input
              type="text"
              name="value"
              className={classnames}
              value={formValues.value}
              onChange={changeHandler}
              placeholder="Enter option Value"
            />
            {errors.value && <p className={errorClass}>{errors.value}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOption;
