import React from "react";
import Card from "@/common/ui/Card";
import Heading from "@/common/ui/Heading";
import TaskForm from "@/app/tasks/TaskForm";
import Breadcrumb from "@/common/ui/Breadcrumb";

const UpdateTask: React.FC = () => {
  return (
    <div>
      <Heading label="Update Task" backPath="/tasks" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Task", "Update"]} />
      </div>
      <div className="mb-12 w-full">
        <div className="bg-white w-[80%] rounded-md mx-auto">
          <div className="mt-10 sm:mx-auto sm:w-full">
            <Card>
              <TaskForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
