import React, { Fragment } from "react";
import { Meeting } from "@/types/meeting.types";
import CustomValuesCard from "@/common/ui/CustomValuesCard";
import { meetingFormValues } from "./meetingSlice";

interface PropsType {
    meeting: Meeting;
}

const MeetingCard: React.FC<PropsType> = ({ meeting }) => {
    const {
        agenda,
        attendesContact,
        dateTime,
        location,
        notes,
    } = meeting;

    const renderValueOrNA = (value: any) => {
        return value ? value : "N/A";
    };

    return (
        <Fragment>
            <div className="rounded shadow-2xl bg-white w-[80%] mx-auto mb-8">
                <div className="px-6 py-4">
                    <p className="text-gray-700 text-base my-1 flex">
                        <h2 className="w-[30%] text-sm font-semibold">Agenda:</h2>
                        <span className="w-[70%] text-sm">{agenda}</span>
                    </p>
                    <p className="text-gray-700 text-base my-1 flex">
                        <h2 className="w-[30%] text-sm font-semibold">Choose preferred Attendes Contact:</h2>
                        <span className="w-[70%] text-sm">{attendesContact}</span>
                    </p>
                    <p className="text-gray-700 text-base my-1 flex">
                        <h2 className="w-[30%] text-sm font-semibold">Related To:</h2>
                        <span className="w-[70%] text-sm">{dateTime}</span>
                    </p>
                    <p className="text-gray-700 text-base my-1 flex">
                        <h2 className="w-[30%] text-sm font-semibold">Location:</h2>
                        <span className="w-[70%] text-sm">{location}</span>
                    </p>
                    <p className="text-gray-700 text-base my-1 flex">
                        <h2 className="w-[30%] text-sm font-semibold">Date time:</h2>
                        <span className="w-[70%] text-sm">
                            {renderValueOrNA(dateTime)}
                        </span>
                    </p>
                    <p className="text-gray-700 text-base my-1 flex">
                        <h2 className="w-[30%] text-sm font-semibold">Notes:</h2>
                        <span className="w-[70%] text-sm">{notes}</span>
                    </p>
                </div>
            </div>
            <div>
                <CustomValuesCard
                    values={meeting}
                    initialValues={{ id: "", ...meetingFormValues }}
                />
            </div>
        </Fragment>
    );
};

export default MeetingCard;
