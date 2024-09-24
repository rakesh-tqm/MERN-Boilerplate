"use client";
import React, { useEffect, useState } from "react";
import Button from "@/common/ui/Button";
import Select from "@/common/ui/Select";
import { Input } from "@/common/ui/Input";
import { Label } from "@/common/ui/Label";
import TextArea from "@/common/ui/Textarea";
import NotifyMsg from "@/common/ui/NotifyMsg";
import Wizard from "@/common/ui/wizard/Wizard";
import CheckInput from "@/common/ui/CheckInput";
import { OnChangeTypes } from "@/types/ui.types";
import { arrayToSelectOptions } from "@/lib/utils";
import useNotify from "@/lib/customHooks/useNotify";
import { StepType } from "@/types/common/index.type";
import { IsValid } from "@/common/utils/formValidation";
import useOnChange from "@/lib/customHooks/useOnChange";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentStep } from "@/common/ui/wizard/wizardSlice";
import { newFieldValidation } from "@/common/utils/NewFieldUtil";
import CustomField from "@/common/components/customField/CustomField";
import { companyValidationSchema } from "@/common/validations/validationSchema";
import {
  addCompany,
  getCompany,
  updateCompany,
  setCompanyFormValues,
  setSameAsBillingFormValues,
} from "@/app/companies/companySlice";
import {
  states,
  cities,
  countries,
  companyTypes,
  companyFormUUID,
} from "@/common/constant/variables";

interface CompanyFormSteps {
  fetchId?: any;
  fetchData?: any;
  msgType?: string;
  apiError?: string;
  setApiError?: any;
  handleChange: OnChangeTypes;
  checkboxOnChange?: OnChangeTypes;
}

const GeneralForm: React.FC<CompanyFormSteps> = ({
  fetchId,
  fetchData,
  handleChange,
}) => {
  const { companyFormValues } = useAppSelector((state) => state.company);
  const {
    company_name,
    company_email,
    company_size,
    company_type,
    company_phone,
    company_website,
    company_description,
  } = companyFormValues;

  return (
    <div id="general_form" className="w-[400px]">
      <h1 className="text-center font-bold text-primary text-lg">
        General Info
      </h1>
      <div className="my-2">
        <Label>Company Name</Label>
        <Input
          type="text"
          name="company_name"
          value={company_name}
          onChange={handleChange}
          validator={companyValidationSchema.company_name}
        />
      </div>

      <div className="my-2">
        <Label>Email</Label>
        <Input
          type="email"
          name="company_email"
          value={company_email}
          onChange={handleChange}
          validator={companyValidationSchema.company_email}
        />
      </div>

      <div className="my-2">
        <Label>Company Size</Label>
        <Input
          type="text"
          name="company_size"
          value={company_size}
          onChange={handleChange}
          validator={companyValidationSchema.company_size}
        />
      </div>

      <div className="my-2">
        <Label>Company Type</Label>
        <Select
          options={options}
          name="company_type"
          value={company_type}
          onChange={handleChange}
          validator={companyValidationSchema.company_type}
        />
      </div>

      <div className="my-2">
        <Label>Company Phone</Label>
        <Input
          type="text"
          name="company_phone"
          value={company_phone}
          onChange={handleChange}
          validator={companyValidationSchema.company_phone}
        />
      </div>

      <div className="my-2">
        <Label>Website (link)</Label>
        <Input
          type="text"
          name="company_website"
          value={company_website}
          onChange={handleChange}
          validator={companyValidationSchema.company_website}
        />
      </div>

      <div className="my-2">
        <Label>Description</Label>
        <TextArea
          onChange={handleChange}
          name="company_description"
          value={company_description}
          validator={companyValidationSchema.company_description}
        />
      </div>
      <div>
        <CustomField
          fetchId={fetchId}
          fetchData={fetchData}
          onChange={handleChange}
          formType={companyFormUUID}
          formValues={companyFormValues}
          setFormValues={setCompanyFormValues}
        />
      </div>
    </div>
  );
};

const BillingForm: React.FC<CompanyFormSteps> = ({ handleChange }) => {
  const {
    billing_pin,
    billing_city,
    billing_state,
    billing_country,
    billing_address_first,
    billing_address_second,
  } = useAppSelector((state) => state.company.companyFormValues);

  return (
    <div id="billing_form" className="w-[400px]">
      <h1 className="text-center font-bold text-primary text-lg">
        Billing Address
      </h1>
      <div className="my-2">
        <Label>First Address</Label>
        <Input
          type="text"
          onChange={handleChange}
          name="billing_address_first"
          value={billing_address_first}
          validator={companyValidationSchema.billing_address_first}
        />
      </div>

      <div className="my-2">
        <Label>Second Address</Label>
        <Input
          type="text"
          onChange={handleChange}
          name="billing_address_second"
          value={billing_address_second}
          validator={companyValidationSchema.billing_address_second}
        />
      </div>

      <div className="my-2">
        <Label>Country</Label>
        <Select
          name="billing_country"
          value={billing_country}
          onChange={handleChange}
          options={countryOptions}
          validator={companyValidationSchema.billing_country}
        />
      </div>

      <div className="my-2">
        <Label>State</Label>
        <Select
          name="billing_state"
          value={billing_state}
          options={statesOptions}
          onChange={handleChange}
          validator={companyValidationSchema.billing_state}
        />
      </div>

      <div className="my-2">
        <Label>City</Label>
        <Select
          name="billing_city"
          value={billing_city}
          options={citiesOptions}
          onChange={handleChange}
          validator={companyValidationSchema.billing_city}
        />
      </div>

      <div className="my-2">
        <Label>PIN</Label>
        <Input
          type="text"
          name="billing_pin"
          value={billing_pin}
          onChange={handleChange}
          validator={companyValidationSchema.billing_pin}
        />
      </div>
    </div>
  );
};

const ShippingForm: React.FC<CompanyFormSteps> = (props) => {
  const { handleChange, msgType, setApiError, apiError } = props;
  const { company } = useAppSelector((state) => state);
  const { companyFormValues, sameAsBillingFormValues } = company;
  const isApiError = apiError && apiError.length > 0;
  const dispatch = useAppDispatch();
  const onChange = useOnChange();

  const {
    billing_pin,
    billing_city,
    billing_state,
    billing_country,
    billing_address_first,
    billing_address_second,
    shipping_pin,
    shipping_city,
    shipping_state,
    shipping_country,
    shipping_address_first,
    shipping_address_second,
  } = companyFormValues;

  const updateShippingValues = (checked: any) => {
    const updatedValues = {
      shipping_pin: checked ? billing_pin : "",
      shipping_city: checked ? billing_city : "",
      shipping_state: checked ? billing_state : "",
      shipping_country: checked ? billing_country : "",
      shipping_address_first: checked ? billing_address_first : "",
      shipping_address_second: checked ? billing_address_second : "",
    };
    dispatch(setCompanyFormValues({ ...companyFormValues, ...updatedValues }));
  };

  const handleCheckBox: OnChangeTypes = (name, value, checked?, type?) => {
    updateShippingValues(checked);
    onChange(
      sameAsBillingFormValues,
      setSameAsBillingFormValues,
      name,
      value,
      type,
      checked
    );
  };

  return (
    <div id="shipping_form" className="w-[400px]">
      <h1 className="text-center font-bold text-primary text-lg">
        Shipping Address
      </h1>
      <div className="flex items-center justify-start mt-4">
        <CheckInput
          type="checkbox"
          id="sameAsBilling"
          name="sameAsBilling"
          value="sameAsBilling"
          onChange={handleCheckBox}
          formData={sameAsBillingFormValues}
        />
        <Label className="mb-1 ml-4 text-md" htmlFor="sameAsBilling">
          Same as billing address
        </Label>
      </div>
      <div className="my-2">
        <Label>First Address</Label>
        <Input
          type="text"
          onChange={handleChange}
          name="shipping_address_first"
          value={shipping_address_first}
          validator={companyValidationSchema.shipping_address_first}
        />
      </div>

      <div className="my-2">
        <Label>Second Address</Label>
        <Input
          type="text"
          onChange={handleChange}
          name="shipping_address_second"
          value={shipping_address_second}
          validator={companyValidationSchema.shipping_address_second}
        />
      </div>

      <div className="my-2">
        <Label>Country</Label>
        <Select
          name="shipping_country"
          value={shipping_country}
          onChange={handleChange}
          options={countryOptions}
          validator={companyValidationSchema.shipping_country}
        />
      </div>

      <div className="my-2">
        <Label>State</Label>
        <Select
          name="shipping_state"
          value={shipping_state}
          options={statesOptions}
          onChange={handleChange}
          validator={companyValidationSchema.shipping_state}
        />
      </div>

      <div className="my-2">
        <Label>City</Label>
        <Select
          name="shipping_city"
          value={shipping_city}
          options={citiesOptions}
          onChange={handleChange}
          validator={companyValidationSchema.shipping_city}
        />
      </div>

      <div className="my-2">
        <Label>PIN</Label>
        <Input
          type="text"
          name="shipping_pin"
          value={shipping_pin}
          onChange={handleChange}
          validator={companyValidationSchema.shipping_pin}
        />
      </div>

      {isApiError && (
        <NotifyMsg
          msg={apiError}
          setApiError={setApiError}
          msgType={msgType as "error" | "success"}
        />
      )}

      <div>
        <Button type="submit">Submit</Button>
      </div>
    </div>
  );
};

const countryOptions = countries.map((c: string) => arrayToSelectOptions(c));
const options = companyTypes.map((c: string) => arrayToSelectOptions(c));
const statesOptions = states.map((s: string) => arrayToSelectOptions(s));
const citiesOptions = cities.map((c: string) => arrayToSelectOptions(c));

const CompanyForm: React.FC = () => {
  const { company, customField, auth } = useAppSelector((state) => state);
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const { companyFormValues, formMode, companyId } = company;
  const [apiError, setApiError] = useState<string>("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { id: loggedInId } = auth;
  const { fields } = customField;
  const onChange = useOnChange();

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, []);

  const handleChange: OnChangeTypes = (name, value, checked?, type?) => {
    onChange(
      companyFormValues,
      setCompanyFormValues,
      name,
      value,
      type,
      checked
    );
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMsgType("error");
    setApiError("");
    let ErrorTxt: any = "";

    for (let key in companyValidationSchema) {
      let validRes = IsValid(
        companyValidationSchema[key],
        companyFormValues[key] as string,
        key
      );

      if (typeof validRes === "string") {
        ErrorTxt = validRes;
        break;
      }
    }

    ErrorTxt = newFieldValidation(ErrorTxt, fields, companyFormValues);

    if (typeof ErrorTxt === "string" && ErrorTxt?.length) {
      setApiError(ErrorTxt);
      setMsgType("error");
      return false;
    }

    if (formMode === "create") {
      const createValues = { ...companyFormValues, loggedInId };
      const response = await dispatch(addCompany(createValues));
      verifyStatus(response, true, "/companies");
      if (response.type.includes("fulfilled")) {
        dispatch(setCurrentStep(1));
      }
    }

    if (formMode === "update") {
      const response = await dispatch(updateCompany(companyFormValues));
      verifyStatus(response, true, "/companies");
      if (response.type.includes("fulfilled")) {
        dispatch(setCurrentStep(1));
      }
    }
  };

  const steps: StepType[] = [
    {
      id: "01",
      component: (
        <GeneralForm
          fetchId={companyId}
          fetchData={getCompany}
          handleChange={handleChange}
        />
      ),
    },
    { id: "02", component: <BillingForm handleChange={handleChange} /> },
    {
      id: "03",
      component: (
        <ShippingForm
          msgType={msgType}
          apiError={apiError}
          setApiError={setApiError}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return <Wizard steps={steps} isForm onSubmit={submitHandler} />;
};

export default CompanyForm;
