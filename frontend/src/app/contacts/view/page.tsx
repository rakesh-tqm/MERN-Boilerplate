"use client";
import React, { useEffect } from "react";
import ContactCard from "../ContactCard";
import { useRouter } from "next/navigation";
import { Contact } from "@/types/contacts.types";
import { getSingleContact } from "../contactsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import useNotify from "@/lib/customHooks/useNotify";

const ViewContact: React.FC = () => {
  const { contactInfo, contactId } = useAppSelector((state) => state.contacts);
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getContactInfo(contactId as string);
  }, []);

  const getContactInfo = async (id: string) => {
    const response: any = await dispatch(getSingleContact(id));
    verifyStatus(response);
  };

  return (
    <React.Fragment>
      <Heading label="View Contact" backPath="/contacts" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Contact", "Details"]} />
      </div>
      <div className="mt-4">
        {contactInfo && <ContactCard contact={contactInfo as Contact} />}
      </div>
    </React.Fragment>
  );
};

export default ViewContact;
