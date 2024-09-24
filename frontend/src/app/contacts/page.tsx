"use client";
import React, { useEffect } from "react";
import Heading from "@/common/ui/Heading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ContactsListing from "@/common/ui/Tables/ContactsTable";
import {
  setInitialFormValues,
  getAllContact,
  setContactId,
  setFormMode,
  setContactInfo,
} from "./contactsSlice";
import useNotify from "@/lib/customHooks/useNotify";
import Breadcrumb from "@/common/ui/Breadcrumb";
import ContactListing from "@/common/ui/Tables/ContactsTable";

const tableHeaders = [
  "name",
  "email",
  "mobile",
  "Job Title",
  "department",
  "Actions",
];

const Contacts: React.FC = () => {
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const { contacts } = useAppSelector((state) => state.contacts);
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();

  const fetchData = async (id: string) => {
    const response = await dispatch(getAllContact({ loggedInId: id }));
    verifyStatus(response, true);
  };

  useEffect(() => {
    fetchData(loggedInId as string);
    dispatch(setContactId(null));
    dispatch(setContactInfo(null));
    dispatch(setFormMode("create"));
    dispatch(setInitialFormValues());
  }, []);

  return (
    <div>
      <Heading label="Contacts" addLabel="Add" addPath="/contacts/create" />
      <Breadcrumb labels={["Contacts", "List"]} />
      {contacts.length > 0 ? (
        <ContactListing data={contacts} />
      ) : (
        <div className="flex items-center justify-center mt-12">
          <p className="font-bold text-gray-400 text-xl">No Records !</p>
        </div>
      )}
    </div>
  );
};

export default Contacts;
