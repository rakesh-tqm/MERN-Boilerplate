"use client";
import React, { Fragment, useEffect, useState } from "react";
import Select from "@/common/ui/Select";
import Button from "@/common/ui/Button";
import { Label } from "@/common/ui/Label";
import { Input } from "@/common/ui/Input";
import NotifyMsg from "@/common/ui/NotifyMsg";
import { OnChangeTypes } from "@/types/ui.types";
import useNotify from "@/lib/customHooks/useNotify";
import useOnChange from "@/lib/customHooks/useOnChange";
import { IsValid } from "@/common/utils/formValidation";
import { getAllContact } from "../contacts/contactsSlice";
import { getAllCompany } from "../companies/companySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { newFieldValidation } from "@/common/utils/NewFieldUtil";
import CustomField from "@/common/components/customField/CustomField";
import { opportunityValidationSchema } from "@/common/validations/validationSchema";
import {
  customerTypes,
  leadStatuses,
  opportunityFormUUID,
} from "@/common/constant/variables";
import {
  addOpportunity,
  getOpportunity,
  setFormValues,
  updateOpportunity,
} from "@/app/opportunities/opportunitySlice";

const OpportunityForm: React.FC = () => {
  const [msgType] = useState<"error" | "success">("error");
  const states = useAppSelector((state) => state);
  const [apiError, setApiError] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const onChange = useOnChange();

  const { opportunity, company, auth, contacts, customField } = states;
  const { formValues, formMode, opportunityId } = opportunity;
  const { contacts: myContacts } = contacts;
  const updateMode = formMode === "update";
  const { fields } = customField;
  const { companies } = company;
  const { id } = auth;

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const loggedInId = id as string;
    const companyResp = await dispatch(getAllCompany({ loggedInId }));
    if (companyResp.type.includes("fulfilled")) {
      const response = await dispatch(getAllContact({ loggedInId }));
      verifyStatus(response, false);
    } else {
      verifyStatus(companyResp, false);
    }
  };

  const handleChange: OnChangeTypes = (name, value, checked, type) =>
    onChange(formValues, setFormValues, name, value, type, checked);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setApiError("");
    let ErrorTxt: any = "";

    for (let key in opportunityValidationSchema) {
      const value = formValues[key];
      const validation = opportunityValidationSchema[key];
      let validRes = IsValid(validation, value, key);

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    ErrorTxt = newFieldValidation(ErrorTxt, fields, formValues);

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      return false;
    }

    const valueId = formMode === "update" ? opportunityId : id;
    const values = { id: valueId, data: formValues };

    if (formMode === "create") {
      const createResp = await dispatch(addOpportunity(values));
      verifyStatus(createResp, true, "/opportunities");
    } else if (formMode === "update") {
      const updateResp = await dispatch(updateOpportunity(values));
      verifyStatus(updateResp, true, "/opportunities");
    }
  };

  const companyOptions = companies.map(({ company_name, id }) => ({
    value: id,
    label: company_name,
  }));

  const contactOptions = myContacts.map(({ id, firstName, lastName }) => ({
    value: id,
    label: `${firstName} ${lastName}`,
  }));

  const leadOptions = leadStatuses.map((lead) => ({
    value: lead,
    label: lead,
  }));

  const customerOptions = customerTypes.map((c) => ({ value: c, label: c }));

  return (
    <Fragment>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-3">
          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2 w-[50%]">
              <Label>Company</Label>
              <Select
                name="company"
                onChange={handleChange}
                options={companyOptions}
                value={formValues.company}
                validator={opportunityValidationSchema.company}
              />
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <Label>Contact Person</Label>
              <Select
                name="contactPerson"
                onChange={handleChange}
                options={contactOptions}
                value={formValues.contactPerson}
                validator={opportunityValidationSchema.contactPerson}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Opportunity Name</Label>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter opportunity name"
              value={formValues.name}
              validator={opportunityValidationSchema.name}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Status</Label>
            <Select
              name="status"
              options={leadOptions}
              onChange={handleChange}
              value={formValues.status}
              validator={opportunityValidationSchema.status}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Value Range ($)</Label>
            <Input
              type="text"
              name="valueRange"
              onChange={handleChange}
              value={formValues.valueRange}
              placeholder="eg: 100 - 10000"
              validator={opportunityValidationSchema.valueRange}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Customer Type</Label>
            <Select
              name="customerType"
              onChange={handleChange}
              options={customerOptions}
              value={formValues.customerType}
              validator={opportunityValidationSchema.customerType}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Email (lead)</Label>
            <Input
              type="text"
              name="email"
              disabled={updateMode}
              onChange={handleChange}
              value={formValues.email}
              placeholder="Enter your email"
              validator={opportunityValidationSchema.email}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Phone Number (lead)</Label>
            <Input
              type="text"
              name="phone"
              onChange={handleChange}
              value={formValues.phone}
              placeholder="Enter your phone number"
              validator={opportunityValidationSchema.phone}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              onChange={handleChange}
              value={formValues.address}
              placeholder="Enter your address"
              validator={opportunityValidationSchema.address}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              onChange={handleChange}
              value={formValues.city}
              placeholder="Enter your city name"
              validator={opportunityValidationSchema.city}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>State/Province</Label>
            <Input
              type="text"
              name="state"
              onChange={handleChange}
              value={formValues.state}
              placeholder="Enter your state name"
              validator={opportunityValidationSchema.state}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              onChange={handleChange}
              value={formValues.country}
              placeholder="Enter your country name"
              validator={opportunityValidationSchema.country}
            />
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <Label>ZipCode</Label>
            <Input
              type="text"
              name="zipCode"
              onChange={handleChange}
              value={formValues.zipCode}
              placeholder="Enter your ZipCode"
              validator={opportunityValidationSchema.zipCode}
            />
          </div>

          <div className="flex flex-col gap-2 w-[50%]">
            <Label>Referral Source</Label>
            <Input
              type="text"
              name="referralSource"
              onChange={handleChange}
              value={formValues.referralSource}
              placeholder="Enter your referral source"
              validator={opportunityValidationSchema.referralSource}
            />
          </div>
        </div>

        <div>
          <CustomField
            fetchId={opportunityId as string}
            formType={opportunityFormUUID}
            setFormValues={setFormValues}
            fetchData={getOpportunity}
            formValues={formValues}
            onChange={handleChange}
          />

          {apiError && (
            <div className="w-[50%] mx-auto">
              <NotifyMsg
                msg={apiError}
                msgType={msgType}
                setApiError={setApiError}
              />
            </div>
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

export default OpportunityForm;
