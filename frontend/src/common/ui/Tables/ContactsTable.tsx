"use client";
import React, { useState, useMemo, useEffect } from "react";
import Info from "../icons/Info";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Contact } from "@/types/contacts.types";
import useNotify from "@/lib/customHooks/useNotify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  setFormMode,
  setContactId,
  getAllContact,
  deleteContact,
  setContactInfo,
  setInitialFormValues,
} from "@/app/contacts/contactsSlice";
import { setFields } from "@/common/components/customField/customFieldSlice";

interface PropsType {
  data: Contact[];
}

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  margin: 0 0 10px;
  padding: 0 32px 0 16px;
`;

const ContactsTable: React.FC<PropsType> = ({ data }) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const [filterText, setFilterText] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setContactId(null));
    dispatch(setContactInfo(null));
    dispatch(setFormMode("create"));
    dispatch(setInitialFormValues());
  }, []);

  const filteredItems = data.filter(
    (item) =>
      item.email && item.email.toLowerCase().includes(filterText.toLowerCase())
  );

  const Actions: React.FC<{ row: Contact }> = ({ row }) => {
    return (
      <div className="flex items-center">
        <Info onClick={() => navigateToView(row.id as string)} />
        <Edit onClick={() => navigateToUpdate(row.id as string)} />
        <Trash onClick={() => handleDelete(row.id as string)} />
      </div>
    );
  };

  const columns: TableColumn<Contact>[] = [
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: "Email",
      selector: (row) => row.email as string,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber as string,
    },
    {
      name: "Job Title",
      selector: (row) => row.jobTitle as string,
    },
    {
      name: "Department",
      selector: (row) => row.department as string,
    },
    {
      name: "",
      selector: (row) => row.id as string,
      cell: (row) => <Actions row={row} />,
    },
  ];

  const fetchData = async (id: string) => {
    const response = await dispatch(getAllContact({ loggedInId: id }));
    verifyStatus(response, true);
  };

  const navigateToUpdate = (id: string) => {
    dispatch(setContactId(id));
    dispatch(setFormMode("update"));
    router.push("/contacts/update");
  };

  const navigateToView = (id: string) => {
    dispatch(setContactId(id));
    router.push("/contacts/view");
  };

  const handleDelete = async (id: string) => {
    const values = { recordId: id, loggedInId: loggedInId as string };
    const response: any = await dispatch(deleteContact(values));
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

export default ContactsTable;
