import { companyFormUUID, contactFormUUID } from "@/common/constant/variables";

interface FormTypes {
  uuid: string;
  name: string;
}

interface OptionType {
  id?: string;
  label?: string;
  value?: string;
}

export interface FieldTypes {
  uuid: string;
  type: string;
  label: string;
  status: number;
  userId: string;
  formType: string;
  options: OptionType[] | [];
  validationRules: string[] | [];
}

const formTypes: FormTypes[] = [
  {
    uuid: contactFormUUID,
    name: "contact",
  },
  {
    uuid: companyFormUUID,
    name: "company",
  },
];

// {
// uuid: UUID,
// user_id: "user_uuid",
// form_type: "form_type_id",
// field_type: "text | select | checkbox | radio | number",
// validation_rules: "object of valddation rules",
// options: "field type options object",
// label: "Field label text ",
// status: "true - 1| false - 0",
//   }

const customFields: any = [];

export { customFields, formTypes };
