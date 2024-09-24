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
  setFormMode,
  setOpportunity,
  allOpportunities,
  setOpportunityId,
  deleteOpportunity,
  setInitialFormValues,
} from "@/app/opportunities/opportunitySlice";

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  margin: 0 0 10px;
  padding: 0 32px 0 16px;
`;

const OpportunityTable: React.FC<{ data: any }> = ({ data }) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const [filterText, setFilterText] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setOpportunity(null));
    dispatch(setFormMode("create"));
    dispatch(setOpportunityId(null));
    dispatch(setInitialFormValues());
  }, []);

  const filteredItems = data.filter(
    (o: FormValuesType) =>
      o.email && o.email.toLowerCase().includes(filterText.toLowerCase())
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
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      name: "Company",
      selector: (row) => row.company,
    },
    {
      name: "Customer Type",
      selector: (row) => row.customerType,
    },

    {
      name: "Actions",
      selector: (row) => row.id as string,
      cell: (row) => <Actions row={row} />,
    },
  ];

  const fetchData = async (id: string) => {
    const response = await dispatch(allOpportunities(id));
    verifyStatus(response, true);
  };

  const navigateToUpdate = (id: string) => {
    dispatch(setOpportunityId(id));
    dispatch(setFormMode("update"));
    router.push("/opportunities/update");
  };

  const navigateToView = (id: string) => {
    dispatch(setOpportunityId(id));
    router.push("/opportunities/view");
  };

  const handleDelete = async (id: string) => {
    const response: any = await dispatch(deleteOpportunity(id));
    verifyStatus(response, true);

    if (response.type.includes("fulfilled")) {
      await fetchData(loggedInId as string);
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
        placeholder="Search by email"
        aria-label="Search Input"
        value={filterText}
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

export default OpportunityTable;
