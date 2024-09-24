"use client";
import React from "react";
import Card from "@/common/ui/Card";
import ContactForm from "../ContactForm";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";

const UpdateContact: React.FC = () => {
  return (
    <div>
      <Heading label="Update Contact" backPath="/contacts" />
      <div className="pl-[50px]">
        <Breadcrumb labels={["Contact", "Update"]} />
      </div>
      <div className="mb-12 w-full">
        <div className="bg-white w-[80%] rounded-md mx-auto">
          <div className="mt-10 sm:mx-auto sm:w-full">
            <Card>
              <ContactForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContact;
