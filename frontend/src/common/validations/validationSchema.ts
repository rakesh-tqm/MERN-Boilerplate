import validations from "@/common/validations/validations";
import { ValidationTypes } from "@/types/common/index.type";

export const singInValidationSchema: ValidationTypes = {
  email: validations.email,
  password: validations.password,
};

export const emailValidationSchema: ValidationTypes = {
  email: validations.email,
};

export const changePasswordValidationSchema: ValidationTypes = {
  password: validations.password,
  confirmPassword: validations.password,
};

export const newFieldValidationSchema: ValidationTypes = {
  label: validations.name,
  type: validations.name,
};

export const signUpValidationSchema: ValidationTypes = {
  firstName: validations.name,
  lastName: validations.name,
  email: validations.email,
  password: validations.password,
  confirmPassword: validations.password,
};

export const resetPasswordValidationSchema: ValidationTypes = {
  email: validations.email,
  password: validations.password,
  confirmPassword: validations.password,
};

export const contactValidationSchema: ValidationTypes = {
  firstName: validations.name,
  lastName: validations.name,
  email: validations.email,
  phoneNumber: validations.phoneNumber,
  jobTitle: validations.name,
  department: validations.name,
  address: validations.address,
  birthday: validations.dateWithDisableNextDates,
};

export const companyValidationSchema: ValidationTypes = {
  company_name: validations.name,
  company_size: validations.number,
  company_type: validations.string,
  company_phone: validations.phoneNumber,
  company_email: validations.email,
  company_website: validations.string,
  company_description: validations.address,
  billing_pin: validations.number,
  billing_city: validations.name,
  billing_state: validations.name,
  billing_country: validations.name,
  billing_address_first: validations.address,
  billing_address_second: validations.address,
  shipping_pin: validations.number,
  shipping_city: validations.name,
  shipping_state: validations.name,
  shipping_country: validations.name,
  shipping_address_first: validations.address,
  shipping_address_second: validations.address,
};

export const opportunityValidationSchema: ValidationTypes = {
  company: validations.name,
  contactPerson: validations.name,
  name: validations.name,
  status: validations.string,
  valueRange: validations.number,
  customerType: validations.string,
  email: validations.email,
  phone: validations.phoneNumber,
  address: validations.address,
  city: validations.string,
  state: validations.string,
  country: validations.string,
  zipCode: validations.number,
  referralSource: validations.string,
};

export const meetingValidationSchema: ValidationTypes = {
  agenda: validations.string,
  attendesContact: validations.string,
  relatedTo: validations.string,
  location: validations.string,
  dateTime: validations.string,
  notes: validations.string,
}
export const taskValidationSchema: ValidationTypes = {
  title: validations.name,
  relatedTo: validations.string,
  assignmentToLead: validations.string,
  description: validations.address,
  startDate: validations.validUntilDate,
  endDate: validations.validUntilDate,
  url: validations.name,
  notes: validations.address,
};
