import React, { useState, useMemo, useEffect } from "react";
import Edit from "../icons/Edit";
import Info from "../icons/Info";
import Trash from "../icons/Trash";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Contact } from "@/types/contacts.types";
import useNotify from "@/lib/customHooks/useNotify";
import { FormValuesType } from "@/common/utils/formTypes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  setCompany,
  setFormMode,
  setCompanyId,
  getAllCompany,
  deleteCompany,
  setInitialFormValues,
} from "@/app/companies/companySlice";

interface PropsType {
  data: FormValuesType[] | [];
}

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  margin: 0 0 10px;
  padding: 0 32px 0 16px;
`;

const CompanyTable: React.FC<PropsType> = ({ data }) => {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const [filterText, setFilterText] = useState("");
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setCompany(null));
    dispatch(setCompanyId(null));
    dispatch(setFormMode("create"));
    dispatch(setInitialFormValues());
  }, []);

  const filteredItems = data.filter(
    (item) =>
      item.company_email &&
      item.company_email.toLowerCase().includes(filterText.toLowerCase())
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

  const columns: TableColumn<FormValuesType>[] = [
    {
      name: "Company Name",
      selector: (row) => row.company_name,
    },
    {
      name: "Email",
      selector: (row) => row.company_email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.company_phone,
    },
    {
      name: "Strength",
      selector: (row) => row.company_size,
    },
    {
      name: "Company Type",
      selector: (row) => row.company_type.toUpperCase(),
    },
    {
      name: "Actions",
      selector: (row) => row.id as string,
      cell: (row) => <Actions row={row} />,
    },
  ];

  const fetchData = async (id: string) => {
    const response = await dispatch(getAllCompany({ loggedInId: id }));
    verifyStatus(response, true);
  };

  const navigateToUpdate = (id: string) => {
    dispatch(setCompanyId(id));
    dispatch(setFormMode("update"));
    router.push("/companies/update");
  };

  const navigateToView = (id: string) => {
    dispatch(setCompanyId(id));
    router.push("/companies/view");
  };

  const handleDelete = async (id: string) => {
    const values = { recordId: id, loggedInId: loggedInId as string };
    const response: any = await dispatch(deleteCompany(values));
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

export default CompanyTable;
