"use client";
import React from "react";
import CompanyForm from "../CompanyForm";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";

const CreateCompany: React.FC = () => {
  return (
    <React.Fragment>
      <Heading label="Add Company" backPath="/companies" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Company", "Add"]} />
      </div>
      <CompanyForm />
    </React.Fragment>
  );
};

export default CreateCompany;
