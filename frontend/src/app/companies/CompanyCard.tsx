import React from "react";
import AddressCard from "@/common/ui/AddressCard";
import { FormValuesType } from "@/common/utils/formTypes";
import CustomValuesCard from "@/common/ui/CustomValuesCard";
import { companyFormValues } from "./companySlice";

interface PropsType {
  data: FormValuesType;
}

const CompanyCard: React.FC<PropsType> = ({ data }) => {
  const {
    billing_pin,
    billing_city,
    company_name,
    company_size,
    company_type,
    shipping_pin,
    company_email,
    company_phone,
    billing_state,
    shipping_city,
    shipping_state,
    billing_country,
    company_website,
    shipping_country,
    company_description,
    billing_address_first,
    billing_address_second,
    shipping_address_first,
    shipping_address_second,
  } = data;

  return (
    <div className="w-full">
      <div className="rounded overflow-hidden shadow-2xl bg-white w-[80%] mx-auto">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl mb-2">{`${company_name}`}</div>
            <a
              rel="noopener"
              target="_blank"
              className="text-xs text-blue-500"
              href={`http://${company_website}`}
            >
              Visit Website
            </a>
          </div>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Email</h2>
            <span className="w-[70%] text-sm">{company_email}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Phone Number</h2>
            <span className="w-[70%] text-sm">{company_phone}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Strength</h2>
            <span className="w-[70%] text-sm">{company_size}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Company Type</h2>
            <span className="w-[70%] text-sm">{company_type}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Description</h2>
            <span className="w-[70%] text-sm text-wrap">
              {company_description}
            </span>
          </p>
        </div>
      </div>

      <AddressCard
        label="Billing Address"
        pin={billing_pin}
        city={billing_city}
        state={billing_state}
        country={billing_country}
        firstAddress={billing_address_first}
        secondAddres={billing_address_second}
      />
      <AddressCard
        label="Shipping Address"
        pin={shipping_pin}
        city={shipping_city}
        state={shipping_state}
        country={shipping_country}
        firstAddress={shipping_address_first}
        secondAddres={shipping_address_second}
      />

      <CustomValuesCard
        values={data}
        initialValues={{ id: "", ...companyFormValues }}
      />
    </div>
  );
};

export default CompanyCard;
