"use client";
import React, { Fragment, useEffect } from "react";
import Modal from "@/common/ui/Modal";
import Button from "@/common/ui/Button";
import { Label } from "@/common/ui/Label";
import Trash from "@/common/ui/icons/Trash";
import useNotify from "@/lib/customHooks/useNotify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addCustomKeysInFormValues, removeKeys } from "@/lib/utils";
import AddNewField from "@/common/components/customField/AddNewField";
import { CustomFieldComponent, FieldType } from "@/types/customField.types";
import GetFieldElement from "@/common/components/customField/GetFieldElement";
import {
  deleteField,
  setShowModal,
  getFormAllFields,
} from "@/common/components/customField/customFieldSlice";

const CustomField: React.FC<CustomFieldComponent> = (props) => {
  const { onChange, formType, formValues, setFormValues, fetchData, fetchId } =
    props;
  const { customField, auth } = useAppSelector((state) => state);
  const { fields, showModal, fieldOptions } = customField;
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { id: loggedInId } = auth;

  useEffect(() => {
    getFormCustomFields(loggedInId as string);
  }, []);

  const getUpdateData = async (id: any) => {
    const response: any = await dispatch(fetchData(id as any));
    verifyStatus(response, true);
    if (response.type.includes("rejected")) return;
    return response.payload.data.data.data;
  };

  const getFormCustomFields = async (loggedInId: string) => {
    let currentFormValues = {};
    const getPayload = { loggedInId, formType };
    const response: any = await dispatch(getFormAllFields(getPayload));
    verifyStatus(response, false);

    if (response.type.includes("fulfilled")) {
      const fieldsPayload = response.payload.data.data.data;
      if (fetchId) {
        const response = await getUpdateData(fetchId);
        currentFormValues = response && response;
      } else {
        currentFormValues = formValues;
      }

      const values = addCustomKeysInFormValues(
        fieldsPayload,
        currentFormValues
      );
      dispatch(setFormValues(values));
    }
  };

  const deleteFieldHandler = async (uuid: string, label: string) => {
    let currentFormValues = {};
    const response = await dispatch(deleteField({ uuid, loggedInId }));
    verifyStatus(response, true);
    if (response.type.includes("fulfilled")) {
      const getPayload = { loggedInId, formType };
      const getFields: any = await dispatch(getFormAllFields(getPayload));
      verifyStatus(getFields, true);

      if (getFields.type.includes("fulfilled")) {
        const fieldsPayload = getFields.payload.data.data.data;
        if (fetchId) {
          const response = await getUpdateData(fetchId);
          currentFormValues = response && response;
        } else {
          currentFormValues = formValues;
        }

        const values = addCustomKeysInFormValues(
          fieldsPayload,
          currentFormValues
        );
        const updatedValues = removeKeys(values, [label.trim()]);
        dispatch(setFormValues(updatedValues));
      }
    }
  };

  return (
    <Fragment>
      {showModal && (
        <Modal>
          <AddNewField
            fields={fields}
            formType={formType}
            formValues={formValues}
            fieldOptions={fieldOptions}
            setFormValues={setFormValues}
          />
        </Modal>
      )}

      {fields.map((data: FieldType, idx: number) => {
        const { label, type, options, uuid, validationRules } = data;
        const validation = validationRules.map((validation: string) => ({
          name: validation,
        }));
        return (
          <div key={idx}>
            <div className="flex items-center justify-between mt-2">
              <Label htmlFor={label}>{label}</Label>
              <Trash
                className="mr-1"
                onClick={() => deleteFieldHandler(uuid, label)}
              />
            </div>
            <div className="mt-2">
              <GetFieldElement
                type={type}
                label={label}
                options={options}
                onChange={onChange}
                formValues={formValues}
                validator={validation}
              />
            </div>
          </div>
        );
      })}

      <div className="flex items-right justify-end mt-8">
        <Button
          type="button"
          className="w-[150px]"
          onClick={() => dispatch(setShowModal(true))}
        >
          Add New Field
        </Button>
      </div>
    </Fragment>
  );
};

export default CustomField;
