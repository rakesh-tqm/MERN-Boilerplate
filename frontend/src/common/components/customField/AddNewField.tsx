"use client";
import React, { useState } from "react";
import Card from "@/common/ui/Card";
import { v4 as uuidv4 } from "uuid";
import Button from "@/common/ui/Button";
import Select from "@/common/ui/Select";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import NotifyMsg from "@/common/ui/NotifyMsg";
import MultiSelect from "@/common/ui/MultiSelect";
import useNotify from "@/lib/customHooks/useNotify";
import { IsValid } from "@/common/utils/formValidation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CustomOption from "@/common/components/customField/CustomOptions";
import { addCustomKeysInFormValues, checkKeyExistence } from "@/lib/utils";
import { NewFieldComponentProps, Option } from "@/types/customField.types";
import {
  contactValidationSchema,
  newFieldValidationSchema,
} from "@/common/validations/validationSchema";
import {
  addField,
  setField,
  setShowModal,
  setFieldOptions,
  getFormAllFields,
  setFieldInitialValues,
} from "@/common/components/customField/customFieldSlice";

const checkBoxOptions = [
  {
    value: "IsRequired",
    label: "Is Required",
  },
];

const restComponentsOptions = [
  {
    value: "MobileNumber",
    label: "Is Mobile",
  },
  {
    value: "validateDate",
    label: "Is Date",
  },
  {
    value: "IsRequired",
    label: "Is Required",
  },
  { value: "IsString", label: "Is String" },
  { value: "IsNumber", label: "Is Number" },
  { value: "IsEmail", label: "Is Email" },
  {
    value: "IsValidPassword",
    label: "Is Password",
  },
];

const selectOptions = [
  { value: "text", label: "Text" },
  { value: "radio", label: "radio" },
  { value: "select", label: "Select" },
  { value: "textarea", label: "Textarea" },
  { value: "checkbox", label: "Checkbox" },
];

const multiSelectOptions = (type: string) =>
  type === "checkbox" ? checkBoxOptions : restComponentsOptions;

const AddNewField = (props: NewFieldComponentProps) => {
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const { formType, fieldOptions, formValues, fields, setFormValues } = props;
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const { field } = useAppSelector((state) => state.customField);
  const [apiError, setApiError] = useState<string>("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { label, type } = field;

  const selectRadioCheckbox =
    type === "select" || type === "radio" || type === "checkbox";

  const submitHandler = async () => {
    const { label, type } = field;
    let ErrorTxt: any;
    const checkOptions =
      type === "select" || type === "checkbox" || type === "radio";

    for (let key in newFieldValidationSchema) {
      let validRes = IsValid(
        newFieldValidationSchema[key],
        (field[key] as string) || "",
        key as "label" | "type"
      );

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      } else {
        ErrorTxt = true;
      }
    }

    if (typeof ErrorTxt !== "string") {
      const alreadyField = checkKeyExistence(label.trim(), formValues);
      ErrorTxt = alreadyField ? "Same type of field already exist" : true;
    }

    if (checkOptions && typeof ErrorTxt === "boolean") {
      if (fieldOptions.length === 0) {
        ErrorTxt = "Please add Options";
      } else {
        for (let option of fieldOptions) {
          const { label, value } = option;
          const validation: any = [{ name: "IsRequired" }];
          const labelError = IsValid(validation, label, "option label");
          if (typeof labelError === "string") {
            ErrorTxt = labelError;
            break;
          } else {
            ErrorTxt = true;
          }

          const valueError = IsValid(validation, value, "option value");
          if (typeof valueError === "string") {
            ErrorTxt = valueError;
            break;
          } else {
            ErrorTxt = true;
          }
        }
      }
    }

    if (typeof ErrorTxt === "string") {
      setApiError(ErrorTxt);
      setMsgType("error");
      return false;
    }

    const createPayload = { data: field, loggedInId: loggedInId, formType };
    const response = await dispatch(addField(createPayload));
    verifyStatus(response, true);

    if (response.type.includes("fulfilled")) {
      dispatch(setFieldOptions([]));
      dispatch(setFieldInitialValues());
      const getAllResponse: any = await dispatch(
        getFormAllFields({ loggedInId, formType })
      );
      verifyStatus(getAllResponse, true);
      const fields = getAllResponse.payload.data.data.data;
      const values = addCustomKeysInFormValues(fields, formValues);
      dispatch(setFormValues(values));
    }

    dispatch(setShowModal(false));
    dispatch(setFieldInitialValues());
  };

  const onAddNewOption = () => {
    const newOption = { id: uuidv4(), label: "", value: "" };
    dispatch(setFieldOptions([...fieldOptions, newOption]));
  };

  const handleCancel = () => {
    dispatch(setFieldInitialValues());
    dispatch(setFieldOptions([[]]));
    dispatch(setShowModal(false));
  };

  const onChangeHandlerInput = async (name: string, value: any) => {
    dispatch(setField({ ...field, options: fieldOptions, [name]: value }));
  };

  return (
    <>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              className="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Create New Field
            </h3>
            <div className="mt-2">
              <div className="mb-12 w-full">
                <div className="bg-white w-[100%] rounded-md ">
                  <div className="mt-10 sm:mx-auto sm:w-full">
                    <Card>
                      <form className="space-y-4">
                        <div className="flex justify-between gap-3">
                          <div className="flex flex-col gap-2 w-[70%]">
                            <Label htmlFor="firstLabel">
                              Enter field label
                            </Label>
                            <Input
                              type="text"
                              id="label"
                              name="label"
                              placeholder="Enter label name"
                              value={label}
                              validator={contactValidationSchema.firstName}
                              onChange={onChangeHandlerInput}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between gap-3">
                          <div className="flex flex-col gap-2 w-[70%]">
                            <Label htmlFor="firstLabel">
                              Select field type
                            </Label>
                            <Select
                              id="type"
                              name="type"
                              value={type}
                              formData={field}
                              options={selectOptions}
                              onChange={onChangeHandlerInput}
                              validator={contactValidationSchema.firstName}
                            />
                          </div>
                        </div>
                        {selectRadioCheckbox && (
                          <div>
                            {fieldOptions.map((o: Option) => (
                              <CustomOption values={o} key={o.id} />
                            ))}

                            <Button
                              className="w-[240px]"
                              onClick={() => onAddNewOption()}
                            >
                              + Add new option
                            </Button>
                          </div>
                        )}

                        <div className="flex justify-between gap-3">
                          <div className="flex flex-col gap-2 w-[70%]">
                            <Label htmlFor="firstLabel">
                              Select validation rules (You can select multiple
                              rules)
                            </Label>
                            <MultiSelect
                              size={5}
                              formData={field}
                              id="validationRules"
                              name="validationRules"
                              onChange={onChangeHandlerInput}
                              options={multiSelectOptions(type)}
                            />
                          </div>
                        </div>
                      </form>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto">
        {apiError && (
          <NotifyMsg
            msg={apiError}
            msgType={msgType}
            setApiError={setApiError}
          />
        )}
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          className="bg-green-600 hover:bg-green-500"
          onClick={submitHandler}
        >
          Submit
        </Button>
        <Button
          className=" bg-white text-gray-900 hover:bg-gray-50"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AddNewField;
