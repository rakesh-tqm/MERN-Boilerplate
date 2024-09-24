"use client";
import React, { Fragment, useEffect } from "react";
import AddressCard from "@/common/ui/AddressCard";
import useNotify from "@/lib/customHooks/useNotify";
import { detailedOpportunity, formValues } from "./opportunitySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CustomValuesCard from "@/common/ui/CustomValuesCard";

const OpportunityCard: React.FC = () => {
  const { opportunity, opportunityId } = useAppSelector(
    (state) => state.opportunity
  );
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchOpportunity(opportunityId as string);
  }, []);

  const fetchOpportunity = async (id: string) => {
    const response = await dispatch(detailedOpportunity(id));
    verifyStatus(response, false);
  };

  return (
    <div className="flex flex-col w-full">
      {opportunity && Object.keys(opportunity).length > 0 && (
        <Fragment>
          <div className="rounded overflow-hidden shadow-2xl bg-white w-[80%] mx-auto">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xl mb-2">
                  {opportunity?.name ?? "N/A"}
                </div>
              </div>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Email</h2>
                <span className="w-[70%] text-sm">
                  {opportunity?.email ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Phone</h2>
                <span className="w-[70%] text-sm">
                  {opportunity?.phone ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Status</h2>
                <span className="w-[70%] text-sm">
                  {opportunity?.status ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Company</h2>
                <span className="w-[70%] text-sm">
                  {opportunity?.company ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">
                  Value Range ($)
                </h2>
                <span className="w-[70%] text-sm text-wrap">
                  {opportunity?.valueRange ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Customer Type</h2>
                <span className="w-[70%] text-sm text-wrap">
                  {opportunity?.customerType ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">
                  Contact Person
                </h2>
                <span className="w-[70%] text-sm text-wrap">
                  {opportunity?.contactPerson ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">
                  Referral Source
                </h2>
                <span className="w-[70%] text-sm text-wrap">
                  {opportunity?.referralSource ?? "N/A"}
                </span>
              </p>
            </div>
          </div>
          <AddressCard
            secondAddres="N/A"
            label="Address Information"
            city={opportunity?.city ?? "N/A"}
            state={opportunity?.state ?? "N/A"}
            pin={opportunity?.zipCode ?? "N/A"}
            country={opportunity?.country ?? "N/A"}
            firstAddress={opportunity?.address ?? "N/A"}
          />
          <CustomValuesCard
            values={opportunity}
            initialValues={{ id: "", createdBy: "", ...formValues }}
          />
        </Fragment>
      )}
    </div>
  );
};

export default OpportunityCard;
