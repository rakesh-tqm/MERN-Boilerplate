"use client";
import React, { useEffect } from "react";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import useNotify from "@/lib/customHooks/useNotify";
import { getAllTasks } from "@/app/tasks/tasksSlice";
import TaskTable from "@/common/ui/Tables/TaskTable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Tasks: React.FC = () => {
  const { auth, task } = useAppSelector((state) => state);
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { tasks } = task;
  const { id } = auth;

  useEffect(() => {
    getMyTasks(id as string);
  }, []);

  const getMyTasks = async (id: string) => {
    const response = await dispatch(getAllTasks(id));
    verifyStatus(response, true);
  };

  return (
    <div>
      <Heading label="Tasks" addLabel="Add" addPath="/tasks/create" />
      <Breadcrumb labels={["Tasks", "List"]} />
      {tasks.length > 0 ? (
        <TaskTable data={tasks} />
      ) : (
        <div className="flex items-center justify-center mt-12">
          <p className="font-bold text-gray-400 text-xl">No Records !</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
