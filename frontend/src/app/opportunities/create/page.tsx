import React from "react";
import Card from "@/common/ui/Card";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import OpportunityForm from "../OpportunityForm";

const CreateOpportunity: React.FC = () => {
  return (
    <div>
      <Heading label="Add Opportunity" backPath="/opportunities" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Opportunity", "Add"]} />
      </div>
      <div className="mb-12 w-full">
        <div className="bg-white w-[80%] rounded-md mx-auto">
          <div className="mt-10 sm:mx-auto sm:w-full">
            <Card>
              <OpportunityForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOpportunity;
