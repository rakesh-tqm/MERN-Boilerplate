"use client";
import React, { useState, useMemo, useEffect } from "react";
import Info from "../icons/Info";
import Edit from "../icons/Edit";
import Trash from "../icons/Trash";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import useNotify from "@/lib/customHooks/useNotify";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import DataTable, { TableColumn } from "react-data-table-component";
import { Meeting } from "@/types/meeting.types";
import { deleteMeeting, getAllMeeting, setFormMode, setInitialFormValues, setMeetingId, setMeetingInfo } from "@/app/meeting/meetingSlice";

interface PropsType {
    data: Meeting[];
}

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  margin: 0 0 10px;
  padding: 0 32px 0 16px;
`;

const MeetingListTable: React.FC<PropsType> = ({ data }) => {
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const { id: loggedInId } = useAppSelector((state) => state.auth);
    const [filterText, setFilterText] = useState("");
    const { verifyStatus } = useNotify();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setMeetingId(null));
        dispatch(setMeetingInfo(null));
        dispatch(setFormMode("create"));
        dispatch(setInitialFormValues());
    }, []);
    const filteredItems = data.filter(
        (item) =>
            item.location && item.location.toLowerCase().includes(filterText.toLowerCase()) || item.relatedTo && item.relatedTo.toLowerCase().includes(filterText.toLowerCase())
    );

    const Actions: React.FC<{ row: Meeting }> = ({ row }) => {
        return (
            <div className="flex items-center">
                <Info onClick={() => navigateToView(row.id as string)} />
                <Edit onClick={() => navigateToUpdate(row.id as string)} />
                <Trash onClick={() => handleDelete(row.id as string)} />
            </div>
        );
    };

    const columns: TableColumn<Meeting>[] = [
        {
            name: "Agenda",
            selector: (row) => `${row.agenda}`,
        },
        {
            name: "Choose preferred Attendes Contact",
            selector: (row) => row.attendesContact as string,
        },
        {
            name: "Related To",
            selector: (row) => row.relatedTo as string,
        },
        {
            name: "Location",
            selector: (row) => row.location as string,
        },
        {
            name: "Date time",
            selector: (row) => row.dateTime as string,
        },
        {
            name: "Notes",
            selector: (row) => row.notes as string,
        },
        {
            name: "",
            selector: (row) => row.id as string,
            cell: (row) => <Actions row={row} />,
        },
    ];

    const fetchData = async (id: string) => {
        const response = await dispatch(getAllMeeting({ loggedInId: id }));
        verifyStatus(response, true);
    };

    const navigateToUpdate = (id: string) => {
        dispatch(setMeetingId(id));
        dispatch(setFormMode("update"));
        router.push("/meeting/update");
    };

    const navigateToView = (id: string) => {
        dispatch(setMeetingId(id));
        router.push("/meeting/view");
    };

    const handleDelete = async (id: string) => {
        const values = { recordId: id, loggedInId: loggedInId as string };
        const response: any = await dispatch(deleteMeeting(values));
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
            // paginationResetDefaultPage={resetPaginationToggle}
            />
        </div>
    );
};

export default MeetingListTable;
