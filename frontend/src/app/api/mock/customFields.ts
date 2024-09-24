import { v4 as uuid } from "uuid";
import { removeKeys } from "@/lib/utils";
import { FormValuesType } from "@/common/utils/formTypes";
import { FieldTypes, customFields } from "@/app/fakeDB/customFieldDb";
import { authMiddleware } from "./mockMiddleware";

type Response = [number, { [key: string]: {} }];

interface Headers {
  userId: string;
  formId: string;
}

/*

interface FieldTypes {
  uuid: string;
  label: string;
  status: number;
  userId: string;
  formType: string;
  fieldType: string;
  options: OptionType[] | [];
  validationRules: string[] | [];
}


 */

const addField = async (config: any): Promise<Response> => {
  const isAuth = await authMiddleware(config as any);
  const { formType, userId } = config.headers;
  if (isAuth && formType && userId) {
    const parsedData = JSON.parse(config.data);
    const { label, options, type, validationRules } = parsedData;

    const data: any = {
      type,
      label,
      userId,
      options,
      formType,
      status: 1,
      uuid: uuid(),
      validationRules,
    };

    customFields.push(data);
    return [201, { data: { message: "Field added" } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const allFields = async (config: any) => {
  const isAuth = await authMiddleware(config as any);
  const { formType, userId } = config.headers;

  if (isAuth && formType && userId) {
    const myFields = customFields.filter(
      (field: any) => field.formType === formType && field.userId === userId
    );

    const onlyNecessaryKeys = myFields.map((field: any) =>
      removeKeys(field, ["status", "userId"])
    );

    return [200, { data: { data: onlyNecessaryKeys } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const deleteField = async (config: any) => {
  const isAuth = await authMiddleware(config);
  const splitted = config.url.split("/");
  const { userId } = config.headers;
  const condition = splitted.length === 5 && isAuth && userId;

  if (condition) {
    const fieldId = splitted.at(-1);
    const deleteCondition = (field: any) =>
      field.uuid === fieldId && field.userId === userId;

    for (let i = 0; i < customFields.length; i++) {
      if (deleteCondition(customFields[i])) {
        customFields.splice(i, 1);
        i--;
      }
    }

    return [200, { data: { message: "Field Deleted" } }];
  }

  return [401, { data: { message: "Invalid Token", status: 401 } }];
};

export default { addField, allFields, deleteField };
