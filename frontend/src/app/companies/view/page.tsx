"use client";
import React, { Fragment, useEffect } from "react";
import Heading from "@/common/ui/Heading";
import { getCompany } from "../companySlice";
import Breadcrumb from "@/common/ui/Breadcrumb";
import useNotify from "@/lib/customHooks/useNotify";
import CompanyCard from "@/app/companies/CompanyCard";
import { FormValuesType } from "@/common/utils/formTypes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const ViewCompany: React.FC = () => {
  const { companyId, companyInfo } = useAppSelector((state) => state.company);
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (companyId) {
      getCompanyInfo(companyId);
    }
  }, []);

  const getCompanyInfo = async (id: string) => {
    const response = await dispatch(getCompany(id));
    verifyStatus(response, true);
  };

  return (
    <Fragment>
      <Heading label="View Company" backPath="/companies" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Company", "Details"]} />
      </div>
      <div className="flex items-center justify-center mt-4">
        {companyInfo && <CompanyCard data={companyInfo as FormValuesType} />}
      </div>
    </Fragment>
  );
};

export default ViewCompany;
