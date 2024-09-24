import React, { Fragment } from "react";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import OpportunityCard from "@/app/opportunities/OpportunityCard";

const ViewOpportunity: React.FC = () => {
  return (
    <Fragment>
      <Heading label="View Opportunity" backPath="/opportunities" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Opportunity", "Details"]} />
      </div>
      <div className="flex items-center justify-center mt-4">
        <OpportunityCard />
      </div>
    </Fragment>
  );
};

export default ViewOpportunity;
