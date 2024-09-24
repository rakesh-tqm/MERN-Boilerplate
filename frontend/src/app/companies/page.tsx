"use client";
import React, { useEffect } from "react";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import useNotify from "@/lib/customHooks/useNotify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CompanyTable from "@/common/ui/Tables/CompanyTable";
import {
  setFormMode,
  setCompanyId,
  getAllCompany,
  setInitialFormValues,
  setInitialSameAsBilling,
} from "./companySlice";

const Company: React.FC = () => {
  const { auth, company } = useAppSelector((state) => state);
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { companies } = company;
  const { id } = auth;

  useEffect(() => {
    fetchData(id as string);
    dispatch(setCompanyId(null));
    dispatch(setFormMode("create"));
    dispatch(setInitialFormValues());
    dispatch(setInitialSameAsBilling());
  }, []);

  const fetchData = async (loggedInId: string) => {
    const response = await dispatch(getAllCompany({ loggedInId }));
    verifyStatus(response, false);
  };

  return (
    <React.Fragment>
      <Heading label="Companies" addLabel="ADD" addPath="/companies/create" />
      <Breadcrumb labels={["Companies", "List"]} />
      {companies.length > 0 ? (
        <CompanyTable data={companies} />
      ) : (
        <div className="flex items-center justify-center mt-12">
          <p className="font-bold text-gray-400 text-xl">No Records !</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Company;
