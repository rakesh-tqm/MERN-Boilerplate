"use client";
import { useAppDispatch } from "../hooks";
import { FormValuesType } from "@/common/utils/formTypes";

const useOnChange = () => {
  const dispatch = useAppDispatch();

  const handleChange = (
    formValues: FormValuesType,
    setFormValues: any,
    name: string,
    value: any,
    type?: string,
    checked?: string
  ) => {
    let values: FormValuesType;

    if (type === "checkbox") {
      const oldValues: any[] = formValues[name] || [];
      const removedValues = oldValues.filter((val: string) => val !== value);
      const finalValues = checked ? [...oldValues, value] : removedValues;

      if (checked && oldValues.includes(value)) return;

      values = { ...formValues, [name]: finalValues };
    } else {
      values = { ...formValues, [name]: value };
    }

    dispatch(setFormValues(values));
  };

  return handleChange;
};

export default useOnChange;
