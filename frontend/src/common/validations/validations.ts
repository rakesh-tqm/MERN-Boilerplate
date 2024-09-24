import { ValidationTypes } from "@/types/common/index.type";

const validation: ValidationTypes = {
  email: [{ name: "IsRequired" }, { name: "IsEmail" }],
  name: [{ name: "IsRequired" }, { name: "MinLength", size: 1 }],
  phoneNumber: [
    { name: "IsRequired" },
    { name: "IsNumber" },
    { name: "MobileNumber" },
    { name: "MinLength", size: 10 },
  ],
  address: [
    { name: "IsRequired" },
    { name: "MinLength", size: 10 },
    { name: "MaxLength", size: 100 },
  ],
  password: [
    { name: "IsRequired" },
    { name: "IsValidPassword" },
    { name: "MinLength", size: 8 },
  ],
  dateWithDisableNextDates: [
    { name: "IsRequired" },
    { name: "validateDate", size: "next" },
  ],
  validUntilDate: [
    { name: "IsRequired" },
    { name: "validateDate", size: "prev" },
  ],

  number: [{ name: "IsRequired" }, { name: "IsNumber" }],
  string: [{ name: "IsRequired" }, { name: "IsString" }],
  required: [{ name: "IsRequired" }],
};

export default validation;
