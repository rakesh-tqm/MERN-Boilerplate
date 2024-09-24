"use client";
import React, { Fragment, useEffect } from "react";
import useNotify from "@/lib/customHooks/useNotify";
import CustomValuesCard from "@/common/ui/CustomValuesCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { detailedTask, formValues } from "@/app/tasks/tasksSlice";

const TaskCard: React.FC = () => {
  const { task, taskId } = useAppSelector((state) => state.task);
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTask(taskId as string);
  }, []);

  const fetchTask = async (id: string) => {
    const response = await dispatch(detailedTask(id));
    verifyStatus(response, false);
  };

  return (
    <div className="flex flex-col w-full">
      {task && Object.keys(task).length > 0 && (
        <Fragment>
          <div className="rounded overflow-hidden shadow-2xl bg-white w-[80%] mx-auto">
            <div className="px-6 py-4">
              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Title</h2>
                <span className="w-[70%] text-sm">{task?.title ?? "N/A"}</span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Start Date</h2>
                <span className="w-[70%] text-sm">
                  {task?.startDate ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">End Date</h2>
                <span className="w-[70%] text-sm">
                  {task?.endDate ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Related To</h2>
                <span className="w-[70%] text-sm text-wrap">
                  {task?.relatedTo.toUpperCase() ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Assigned To</h2>
                <span className="w-[70%] text-sm text-wrap">
                  {task?.assignmentToLead ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Descirption</h2>
                <span className="w-[70%] text-sm text-wrap">
                  {task?.description ?? "N/A"}
                </span>
              </p>

              <p className="text-gray-700 text-base my-1 flex">
                <h2 className="w-[30%] text-sm font-semibold">Notes</h2>
                <span className="w-[70%] text-sm text-wrap">
                  {task?.notes ?? "N/A"}
                </span>
              </p>
            </div>
          </div>

          <CustomValuesCard
            values={task}
            initialValues={{ id: "", createdBy: "", ...formValues }}
          />

          <div className="rounded overflow-hidden shadow-2xl bg-white w-[80%] mx-auto px-6 py-4">
            <div className="flex items-center justify-end">
              <a
                rel="noopener"
                target="_blank"
                className="text-xs text-blue-500"
                href={`http://${task?.url}`}
              >
                Visit Task URL
              </a>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default TaskCard;
