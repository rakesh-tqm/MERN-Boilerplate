import { modifyErrorLabel } from "@/lib/utils";
import { ValidatorType } from "@/types/common/index.type";

// * Validate Mobile number
export const validateMobileNumber = (number: string): string | boolean => {
  return /^[0-9]{10}$/.test(number)
    ? true
    : "Please enter a valid 10-digit mobile number.";
};

// * Validate Date
export const validateDate = (
  key: string,
  date: string,
  disable: "next" | "prev" = "prev"
): string | true => {
  if (!date) {
    return `${key} is required.`;
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return "Invalid date format. Please use YYYY-MM-DD format.";
  }

  const currentDate = new Date();
  const inputDate = new Date(date);

  if (inputDate > currentDate && disable === "next") {
    return `${key} date cannot be in the future.`;
  } else if (inputDate < currentDate && disable === "prev") {
    return `${key} date cannot be in the past.`;
  }

  return true;
};

// * Validate regex method
export const regexValidator = (
  data: string,
  regexRules: {
    regex: RegExp;
    message: string;
  }[]
) => {
  let returnVal: boolean | string = true;
  regexRules.forEach((rule) => {
    if (returnVal !== true) {
      return false;
    }

    // console.log(
    //   "rule?.regex.test(data)",
    //   rule?.regex.test(data),
    //   typeof rule?.regex.test(data)
    // );
    if (rule?.regex.test(data) !== true) {
      returnVal = rule?.message;
    }
  });

  // console.log("returnVal", returnVal);
  return returnVal;
};

// * Is Required field

export const IsRequired = (key: string, data: any) => {
  let response;
  if (typeof data === "undefined") {
    response = `${key} field is required.`;
  } else if (typeof data === "string") {
    response = !data || !data.trim() ? `${key} field is required.` : true;
  } else {
    response = data.length === 0 ? `Please select an option for ${key}.` : true;
  }
  return response;
};

// export const IsRequired = (key: string, data: any) => {
//   const isString = typeof data === "string";

//   try {
//     if (isString) {
//       if (!data || !data.trim()?.length) {
//         return `${key} field is required.`;
//       }
//       return true;
//     } else {
//       if (!data || data.length === 0) {
//         return `Please select the option.`;
//       }
//       return true;
//     }
//   } catch (error) {
//     return `${key} field is required.`;
//   }
// };

// * required minimum length
export const MinLength = (key: string, data: any, minLength: number) => {
  try {
    if (!data || data.trim()?.length < minLength) {
      return `${key} field must be at least ${minLength} characters.`;
    }
    return true;
  } catch (error) {
    return `${key} field must be at least ${minLength} characters.`;
  }
};

// * required maximum length
export const MaxLength = (key: string, data: any, maxLength: number) => {
  try {
    if (!data || data.trim()?.length > maxLength) {
      return `${key} field can not exceed ${maxLength} characters.`;
    }
    return true;
  } catch (error) {
    return `${key} field can not exceed ${maxLength} characters.`;
  }
};

// * Is String value
export const IsString = (key: string, data: string) => {
  try {
    if (!data || typeof data.trim() !== "string") {
      return `${key} field must be string.`;
    }
    return true;
  } catch (error) {
    return `${key} field must be string.`;
  }
};

// * Is Number value
export const IsNumber = (key: string, data: string) => {
  try {
    if (!data || isNaN(parseFloat(data))) {
      return `${key} field must be number.`;
    }
    return true;
  } catch (error) {
    return `${key} field must be number.`;
  }
};

// * Email Required
export const IsEmail = (key: string, data: string) => {
  try {
    const passwordRegex = [
      {
        regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g,
        message: `${key} does not match the required pattern ex:example@example.com`,
      },
    ];

    const validateMsg = regexValidator(data, passwordRegex);
    // console.log("validateMsg", validateMsg);
    if (validateMsg !== true) {
      return validateMsg;
    }

    return true;
  } catch (error) {
    return `${key} does not match the required pattern ex:example@example.com`;
  }
};

// * Is Valid password
export const IsValidPassword = (key: string, data: string) => {
  try {
    const passwordRegex = [
      {
        regex: /(?=.*?[a-z])/,
        message: `There must be one lowercase character in the ${key}.`,
      },
      {
        regex: /(?=.*?[A-Z])/,
        message: `There must be one uppercase character in the ${key}.`,
      },
      {
        regex: /(?=.*?[0-9])/,
        message: `There must be one digit in the ${key}.`,
      },
      {
        regex: /(?=.*?[#?!@$%^&*-])/,
        message: `There must be one special character in the ${key}.`,
      },
    ];
    const validateMsg = regexValidator(data, passwordRegex);
    if (validateMsg !== true) {
      return validateMsg;
    }

    return true;
  } catch (error) {
    return "Invalid password format.";
  }
};

// * Validate all validation rules as per input
export const IsValid = (
  validator: ValidatorType[],
  value: any,
  key: string
) => {
  const label = modifyErrorLabel(key);
  let returnVal: string | boolean = true;
  for (let val of validator) {
    let valMethod = val?.name;
    switch (valMethod) {
      case "IsRequired":
        returnVal = IsRequired(label, value);
        break;
      case "IsEmail":
        returnVal = IsEmail(label, value);
        break;
      case "IsValidPassword":
        returnVal = IsValidPassword(label, value);
        break;
      case "MinLength":
        returnVal = MinLength(label, value, val?.size as number);
        break;
      case "validateDate":
        returnVal = validateDate(label, value, val?.size as "next" | "prev");
        break;

      case "MaxLength":
        returnVal = MaxLength(label, value, val?.size as number);
        break;

      case "IsNumber":
        returnVal = IsNumber(label, value as string);
        break;

      // this case is for future implementation

      // case "IsDate":
      //   returnVal = validateDate(value);
      //   break;

      case "MobileNumber":
        returnVal = validateMobileNumber(value);
        break;
    }

    if (typeof returnVal === "string") {
      break;
    }
  }
  return returnVal;
};
