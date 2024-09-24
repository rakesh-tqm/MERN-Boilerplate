import { FormValuesType } from "@/common/utils/formTypes";
import { PayloadActionCreator } from "@reduxjs/toolkit";

export interface FieldType {
  [key: string]: any;
}

export interface Option {
  [key: string]: string;
}

export interface GetFieldElementProps {
  value?: any;
  type: string;
  label: string;
  options: Option[] | [];
  validator: string[] | [];
  formValues: FormValuesType;
  onChange: (name: string, value: string) => void;
}

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface NewFieldComponentProps {
  formType: string;
  fields: FieldType[];
  formValues: FormValuesType;
  fieldOptions: Option[] | [];
  setFormValues: PayloadActionCreator<FormValuesType>;
}

export interface CustomFieldComponent {
  fetchId: string;
  formType: string;
  formValues: FormValuesType;
  fetchData: (id: string) => any;
  onChange: (name: string, value: any) => void;
  setFormValues: PayloadActionCreator<FormValuesType>;
}

export type AddCustomKeysInFormValuesTypes = (
  fields: FieldType[] | [],
  formValues: FormValuesType
) => FormValuesType;
