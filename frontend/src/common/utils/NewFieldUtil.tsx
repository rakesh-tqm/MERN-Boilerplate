import { useAppDispatch } from "@/lib/hooks";
import CheckInput from "../ui/CheckInput";
import { Input } from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/Textarea";
import { FormValuesType } from "./formTypes";
import { IsValid } from "./formValidation";
import { modifyFieldName } from "./commonUtils";

// * Get all field as per the field type
export const getFieldElement = (
  type: string,
  label: string,
  options: { [key: string]: string }[] | [],
  setContactFormValues: (name: string, value: string) => void,
  contactFormValues: FormValuesType
) => {
  if (type.trim() && label.trim()) {
    switch (type) {
      case "textarea":
        return (
          <TextArea
            id={type + "__" + label}
            name={type + "__" + label}
            value={contactFormValues[type + "__" + label] as string}
            onChange={setContactFormValues}
          />
        );
      case "select":
        return (
          <Select
            id={type + "__" + label}
            name={type + "__" + label}
            options={
              options &&
              options.map((val) => {
                return { value: val?.value, label: val?.label };
              })
            }
            value=""
            onChange={setContactFormValues}
            formData={contactFormValues}
          />
        );
      case "checkbox":
      case "radio":
        let checkData =
          options &&
          options.map((data) => {
            return (
              <div key={data?.label + "__" + data?.type}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center h-5">
                    <div className="relative">
                      <CheckInput
                        type={type}
                        name={
                          type === "checkbox"
                            ? data?.id + "__" + data?.label
                            : type + "__" + label
                        }
                        value={data?.value}
                        onChange={setContactFormValues}
                      />
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
            id={type + "__" + label}
            name={type + "__" + label}
            value=""
            onChange={setContactFormValues}
          />
        );
    }
  }
};

interface NewFieldTypes {
  [key: string]: any;
}

// * Validate field as per the given validation rules
export const newFieldValidation = (
  ErrorTxt: string,
  newFields: NewFieldTypes[] | [],
  formData: FormValuesType
) => {
  const errorTextConditon = typeof ErrorTxt !== "string" || !ErrorTxt?.length;

  if (errorTextConditon) {
    let errorText: any;
    let validationResult: any;
    for (let field of newFields) {
      const { type, label, validationRules } = field;
      const needToValidate = validationRules.length;
      const name = label.trim();
      const additionalValue = type === "checkbox" ? [] : "";

      if (needToValidate) {
        const currentFieldName = modifyFieldName(name);
        const formFieldValue = formData[name] ?? additionalValue;
        const validator = validationRules.map((val: any) => ({ name: val }));
        validationResult = IsValid(validator, formFieldValue, currentFieldName);

        if (typeof validationResult === "string") {
          errorText = validationResult;
          break;
        }
      }
    }
    return errorText;
  }
  return ErrorTxt;
};

// export const newFieldValidation = (
//   ErrorTxt: string,
//   newFields: NewFieldTypes[] | [],
//   formData: FormValuesType
// ) => {
//   if (typeof ErrorTxt !== "string" || !ErrorTxt?.length) {
//     let errTxt = "";
//     for (let data of newFields) {
//       const customName = `${data.type}__${data.label}`;
//       if (data?.validationRules?.length) {
//         let dataValue =
//           data?.type === "radio"
//             ? formData[data.type + "__" + data.label]
//             : data?.type === "checkbox"
//             ? data?.options.some((subdata: any) => {
//                 console.log("formDAta", formData[customName]);

//                 // console.log(
//                 //   "data:",
//                 //   formData[subdata?.id + "__" + subdata?.label],
//                 //   typeof formData[subdata?.id + "__" + subdata?.label],
//                 //   formData[subdata?.id + "__" + subdata?.label] === true
//                 // );
//                 return formData[subdata?.id + "__" + subdata?.label] === true;
//               }) && "done"
//             : formData[data.type + "__" + data.label];
//         let validRes = IsValid(
//           data.validationRules.map((val: any) => {
//             return { name: val };
//           }),
//           (dataValue as string) || "",
//           data.label as string
//         );

//         if (typeof validRes === "string") {
//           errTxt = validRes;
//           break;
//         }
//       }
//     }
//     return errTxt;
//   }
//   return ErrorTxt;
// };

// * Delete new dynamic field
export const deleteNewField = (
  type: string,
  label: string,
  fields:
    | []
    | {
        [key: string]: any;
      }[],
  setFields: any,
  formData: FormValuesType,
  setFormData:
    | React.Dispatch<React.SetStateAction<FormValuesType>>
    | ((data: { [index: string]: any }) => void),
  options: { [key: string]: string }[] | []
) => {
  const dispatch = useAppDispatch();
  let currentNewFields = fields.filter((data) => {
    return !(data?.type === type && data?.label === label);
  });

  let currentFormData: FormValuesType | {} = {};
  for (let key in formData) {
    if (type === "checkbox") {
      const optionsData = options.map(
        (option) => option?.id + "__" + option?.label
      );
      //   console.log(
      //     "key optons:",
      //     optionsData,
      //     option?.id + "__" + option?.label,
      //     key != option?.id + "__" + option?.label
      //   );
      if (!optionsData.includes(key)) {
        currentFormData = { ...currentFormData, [key]: formData[key] };
      }
    } else {
      if (key !== type + "__" + label) {
        currentFormData = { ...currentFormData, [key]: formData[key] };
      }
    }
  }

  //   console.log("type,label", currentFormData);
  dispatch(setFields(currentNewFields));
  setFormData({ ...currentFormData });

  // Add the axios code to delete the field from user new field objects
};
