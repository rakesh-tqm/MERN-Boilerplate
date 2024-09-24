import { FormValuesType } from "@/common/utils/formTypes";
import { AddCustomKeysInFormValuesTypes } from "@/types/customField.types";
import { type ClassValue, clsx } from "clsx";
import { twJoin, twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function joinClasses(...inputs: ClassValue[]) {
  return twJoin(clsx(inputs));
}

export const trimAndRemoveEmpty = (obj: FormValuesType) => {
  const trimmedObj: Partial<FormValuesType> = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        trimmedObj[key] = trimmedValue;
      }
    } else if (value) {
      trimmedObj[key] = value;
    }
  }
  return trimmedObj;
};

export const removeKeys = (
  obj: FormValuesType,
  keysToRemove: string[]
): Partial<FormValuesType> => {
  const newObj: Partial<FormValuesType> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!keysToRemove.includes(key)) {
      newObj[key] = value;
    }
  }
  return newObj;
};

export const addMinutesToTimestamp = (minutes: number = 0): number => {
  const millisecondsInMinute = 60000;
  const currentTimeStamp = Date.now();
  return currentTimeStamp + minutes * millisecondsInMinute;
};

export const arrayToSelectOptions = (val: string) => ({
  label: val,
  value: val.toLowerCase(),
});

export const extractLabels = (arrayOfObjects: any) => {
  let values: any = {};
  for (const item of arrayOfObjects) {
    const { label, type } = item;
    const name = `${type}__${label}`;
    const value = type === "checkbox" ? [] : "";
    values[name] = value;
  }
  return values;
};

export const splitAtCapital = (str: string) => str.split(/(?=[A-Z])/);
export const hasWhiteSpace = (str: string) => /\s/.test(str);

export const capitalizeFirstLetterAndJoin = (arr: string[]): string => {
  if (arr.length === 0) return "";
  const firstWord = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
  const restWords = arr.slice(1);
  return [firstWord, ...restWords].join(" ");
};

export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const containsUnderscore = (str: string): boolean => str.includes("_");

export const isCamelCase = (str: string): boolean =>
  /^[a-z]+(?:[A-Z][a-z]*)*$/.test(str);

export const modifyErrorLabel = (key: string) => {
  if (containsUnderscore(key)) {
    const splitted = key.split("_");
    return capitalizeFirstLetterAndJoin(splitted);
  } else if (isCamelCase(key)) {
    return capitalizeFirstLetter(splitAtCapital(key).join(" "));
  } else if (hasWhiteSpace(key)) {
    return capitalizeFirstLetter(key);
  } else {
    return capitalizeFirstLetter(key);
  }
};

export const checkKeyExistence = (key: string, obj: FormValuesType): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key);

export const addCustomKeysInFormValues: AddCustomKeysInFormValuesTypes = (
  fields,
  formValues
) => {
  return fields.length
    ? {
        ...fields.reduce(
          (acc, field) => ({
            ...acc,
            [field.label.trim()]: field.type === "checkbox" ? [] : "",
          }),
          {}
        ),
        ...formValues,
      }
    : formValues;
};

export const getObjectKeysArray = (obj: FormValuesType): string[] | [] =>
  Object.keys(obj);

export const capitalizeStringFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const truncateString = (str: string): string => {
  if (str.length <= 20) {
    return str;
  } else {
    return str.slice(0, 17) + "...";
  }
};
