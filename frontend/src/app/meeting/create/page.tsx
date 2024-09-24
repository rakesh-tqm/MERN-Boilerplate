"use client";
import React from "react";
import Heading from "@/common/ui/Heading";
import Card from "@/common/ui/Card";
import Breadcrumb from "@/common/ui/Breadcrumb";
import MeetingForm from "../meetingForm";

const CreateMeeting: React.FC = () => {
    return (
        <div>
            <Heading label="Add Meeting" backPath="/meeting" />
            <div className="pl-[50px]">
                <Breadcrumb labels={["Contact", "Add"]} />
            </div>
            <div className="mb-12 w-full">
                <div className="bg-white w-[80%] rounded-md mx-auto">
                    <div className="mt-10 sm:mx-auto sm:w-full">
                        <Card>
                            <MeetingForm />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMeeting;
