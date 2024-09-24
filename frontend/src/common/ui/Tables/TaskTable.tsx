"use client";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Info from "@/common/ui/icons/Info";
import Edit from "@/common/ui/icons/Edit";
import Trash from "@/common/ui/icons/Trash";
import { useRouter } from "next/navigation";
import useNotify from "@/lib/customHooks/useNotify";
import { FormValuesType } from "@/common/utils/formTypes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  setTask,
  setTaskId,
  deleteTask,
  getAllTasks,
  setFormMode,
  setInitialFormValues,
} from "@/app/tasks/tasksSlice";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  margin: 0 0 10px;
  padding: 0 32px 0 16px;
`;

const TaskTable: React.FC<{ data: any }> = ({ data }) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const [filterText, setFilterText] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setTask(null));
    dispatch(setTaskId(null));
    dispatch(setFormMode("create"));
    dispatch(setInitialFormValues());
  }, []);

  const filteredItems = data.filter((task: FormValuesType) =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const Actions: React.FC<{ row: FormValuesType }> = ({ row }) => {
    return (
      <div className="flex items-center">
        <Info onClick={() => navigateToView(row.id as string)} />
        <Edit onClick={() => navigateToUpdate(row.id as string)} />
        <Trash onClick={() => handleDelete(row.id as string)} />
      </div>
    );
  };

  const columns: TableColumn<FormValuesType>[] = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Related To",
      selector: (row) => row.relatedTo.toUpperCase(),
    },
    { name: "Start Date", selector: (row) => row.startDate },
    { name: "End Date", selector: (row) => row.endDate },
    {
      name: "Assigned To",
      selector: (row) => row.assignmentToLead,
    },
    {
      name: "Actions",
      selector: (row) => row.id as string,
      cell: (row) => <Actions row={row} />,
    },
  ];

  const fetchTasks = async (id: string) => {
    const response = await dispatch(getAllTasks(id));
    verifyStatus(response, true);
  };

  const navigateToUpdate = (id: string) => {
    dispatch(setTaskId(id));
    dispatch(setFormMode("update"));
    router.push("/tasks/update");
  };

  const navigateToView = (id: string) => {
    dispatch(setTaskId(id));
    router.push("/tasks/view");
  };

  const handleDelete = async (id: string) => {
    const response: any = await dispatch(deleteTask(id));
    verifyStatus(response, true);

    if (response.type.includes("fulfilled")) {
      await fetchTasks(loggedInId as string);
    }
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <TextField
        id="search"
        type="text"
        value={filterText}
        aria-label="Search Input"
        placeholder="Search using title"
        onChange={(e) => setFilterText(e.target.value)}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="py-4 px-8">
      <DataTable
        subHeader
        pagination
        persistTableHead
        columns={columns}
        data={filteredItems}
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
      />
    </div>
  );
};

export default TaskTable;
