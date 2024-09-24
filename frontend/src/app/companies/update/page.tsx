"use client";
import React from "react";
import CompanyForm from "../CompanyForm";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";

const UpdateCompany: React.FC = () => {
  return (
    <React.Fragment>
      <Heading label="Update Company" backPath="/companies" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Company", "Update"]} />
      </div>
      <CompanyForm />
    </React.Fragment>
  );
};

export default UpdateCompany;
