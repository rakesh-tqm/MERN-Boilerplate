"use client";
import React, { Fragment, useState } from "react";
import Button from "@/common/ui/Button";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import TextArea from "@/common/ui/Textarea";
import NotifyMsg from "@/common/ui/NotifyMsg";
import { trimAndRemoveEmpty } from "@/lib/utils";
import { OnChangeTypes } from "@/types/ui.types";
import useNotify from "@/lib/customHooks/useNotify";
import useOnChange from "@/lib/customHooks/useOnChange";
import { IsValid } from "@/common/utils/formValidation";
import { FormValuesType } from "@/common/utils/formTypes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { contactFormUUID } from "@/common/constant/variables";
import { newFieldValidation } from "@/common/utils/NewFieldUtil";
import CustomField from "@/common/components/customField/CustomField";
import { contactValidationSchema } from "@/common/validations/validationSchema";
import {
  updateContact,
  createContact,
  getSingleContact,
  setContactFormValues,
} from "@/app/contacts/contactsSlice";

const ContactForm: React.FC = () => {
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const { fields } = useAppSelector((state) => state.customField);
  const { contacts, auth } = useAppSelector((state) => state);
  const { formMode, contactId, contactFormValues } = contacts;
  const [apiError, setApiError] = useState<string>("");
  const disabled = formMode === "update";
  const handleChange = useOnChange();
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { id: loggedInId } = auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMsgType("error");
    setApiError("");
    let ErrorTxt: any = "";

    for (let key in contactValidationSchema) {
      let validRes = IsValid(
        contactValidationSchema[key],
        contactFormValues[key] as string,
        key
      );

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    // * For dynamic new field validations
    ErrorTxt = newFieldValidation(ErrorTxt, fields, contactFormValues);

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      setMsgType("error");
      return false;
    }

    const values = trimAndRemoveEmpty({
      ...contactFormValues,
      loggedInId: loggedInId as string,
    }) as FormValuesType;

    if (formMode === "create") {
      const response: any = await dispatch(createContact(values));
      verifyStatus(response, true, "/contacts");
      return;
    }

    if (formMode === "update") {
      const response: any = await dispatch(updateContact(contactFormValues));
      verifyStatus(response, true, "/contacts");
      return;
    }
  };

  const changeHandler: OnChangeTypes = (name, value, checked?, type?) => {
    handleChange(
      contactFormValues,
      setContactFormValues,
      name,
      value,
      type,
      checked
    );
  };

  return (
    <Fragment>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              onChange={changeHandler}
              value={contactFormValues.firstName as string}
              validator={contactValidationSchema.firstName}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              onChange={changeHandler}
              value={contactFormValues.lastName as string}
              validator={contactValidationSchema.lastName}
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              disabled={disabled}
              onChange={changeHandler}
              value={contactFormValues.email as string}
              validator={contactValidationSchema.email}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="phoneNumber">Mobile Number</Label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={changeHandler}
              placeholder="Enter mobile number"
              value={contactFormValues.phoneNumber as string}
              validator={contactValidationSchema.phoneNumber}
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              type="text"
              id="jobTitle"
              name="jobTitle"
              placeholder="Enter job title"
              onChange={changeHandler}
              value={contactFormValues.jobTitle as string}
              validator={contactValidationSchema.jobTitle}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="department">Department</Label>
            <Input
              type="text"
              id="department"
              name="department"
              placeholder="Enter department"
              onChange={changeHandler}
              value={contactFormValues.department as string}
              validator={contactValidationSchema.department}
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              onChange={changeHandler}
              value={contactFormValues.address as string}
              validator={contactValidationSchema.address}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              type="date"
              id="birthday"
              name="birthday"
              onChange={changeHandler}
              value={contactFormValues.birthday as string}
              placeholder="Enter Social Media Profiles"
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              type="text"
              id="linkedin"
              name="linkedin"
              onChange={changeHandler}
              value={contactFormValues.linkedin as string}
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              type="text"
              id="facebook"
              name="facebook"
              onChange={changeHandler}
              value={contactFormValues.facebook as string}
            />
          </div>
        </div>

        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              type="text"
              id="twitter"
              name="twitter"
              onChange={changeHandler}
              value={contactFormValues.twitter as string}
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <Label htmlFor="communicationChannel">
              Preferred Communication Channel
            </Label>
            <Input
              type="text"
              id="communicationChannel"
              name="communicationChannel"
              onChange={changeHandler}
              value={contactFormValues.communicationChannel as string}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notes">Notes</Label>
          </div>
          <div className="mt-2">
            <TextArea
              id="notes"
              name="notes"
              onChange={changeHandler}
              value={contactFormValues.notes as string}
            />
          </div>
        </div>

        <div>
          <CustomField
            onChange={changeHandler}
            formType={contactFormUUID}
            fetchId={contactId as string}
            formValues={contactFormValues}
            fetchData={getSingleContact as any}
            setFormValues={setContactFormValues}
          />

          {apiError && (
            <NotifyMsg
              msg={apiError}
              msgType={msgType}
              setApiError={setApiError}
            />
          )}
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-[250px]">
              {formMode.toUpperCase()}
            </Button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ContactForm;
