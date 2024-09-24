"use client";
import React, { useEffect } from "react";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import useNotify from "@/lib/customHooks/useNotify";
import { allOpportunities } from "./opportunitySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import OpportunityTable from "@/common/ui/Tables/OpportunityTable";

const Opportunities: React.FC = () => {
  const { opportunity, auth } = useAppSelector((state) => state);
  const { opportunities } = opportunity;
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { id } = auth;

  useEffect(() => {
    fetchData(id as string);
  }, []);

  const fetchData = async (id: string) => {
    const response = await dispatch(allOpportunities(id));
    verifyStatus(response, true);
  };
  return (
    <div>
      <Heading
        addLabel="Add"
        label="Opportunities"
        addPath="/opportunities/create"
      />
      <Breadcrumb labels={["Opportunities", "List"]} />
      {opportunities.length > 0 ? (
        <OpportunityTable data={opportunities} />
      ) : (
        <div className="flex items-center justify-center mt-12">
          <p className="font-bold text-gray-400 text-xl">No Records !</p>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
