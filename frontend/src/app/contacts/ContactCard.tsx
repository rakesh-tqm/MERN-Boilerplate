import React, { Fragment } from "react";
import { Contact } from "@/types/contacts.types";
import CustomValuesCard from "@/common/ui/CustomValuesCard";
import { contactFormValues } from "./contactsSlice";

interface PropsType {
  contact: Contact;
}

const ContactCard: React.FC<PropsType> = ({ contact }) => {
  const {
    email,
    address,
    lastName,
    jobTitle,
    firstName,
    department,
    phoneNumber,
  } = contact;

  const renderValueOrNA = (value: any) => {
    return value ? value : "N/A";
  };

  return (
    <Fragment>
      <div className="rounded shadow-2xl bg-white w-[80%] mx-auto mb-8">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {`${firstName} ${lastName}`}
          </div>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Email:</h2>
            <span className="w-[70%] text-sm">{email}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Phone Number:</h2>
            <span className="w-[70%] text-sm">{phoneNumber}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Job Title:</h2>
            <span className="w-[70%] text-sm">{jobTitle}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Department:</h2>
            <span className="w-[70%] text-sm">{department}</span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Birthday:</h2>
            <span className="w-[70%] text-sm">
              {renderValueOrNA(contact.birthday)}
            </span>
          </p>
          <p className="text-gray-700 text-base my-1 flex">
            <h2 className="w-[30%] text-sm font-semibold">Address:</h2>
            <span className="w-[70%] text-sm">{address}</span>
          </p>
        </div>
      </div>
      <div>
        <CustomValuesCard
          values={contact}
          initialValues={{ id: "", ...contactFormValues }}
        />
      </div>
    </Fragment>
  );
};

export default ContactCard;
