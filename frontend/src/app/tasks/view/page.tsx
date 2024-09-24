import React, { Fragment } from "react";
import Heading from "@/common/ui/Heading";
import TaskCard from "@/app/tasks/TaskCard";
import Breadcrumb from "@/common/ui/Breadcrumb";

const ViewTask: React.FC = () => {
  return (
    <Fragment>
      <Heading label="View Task" backPath="/tasks" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Task", "Details"]} />
      </div>
      <div className="flex items-center justify-center mt-4">
        <TaskCard />
      </div>
    </Fragment>
  );
};

export default ViewTask;
