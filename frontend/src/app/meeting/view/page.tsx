"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import useNotify from "@/lib/customHooks/useNotify";
import { getSingleMeeting } from "../meetingSlice";
import MeetingCard from "../meetingCard";
import { Meeting } from "@/types/meeting.types";

const ViewContact: React.FC = () => {
    const { meetingInfo, meetingId } = useAppSelector((state) => state.meeting);
    const { verifyStatus } = useNotify();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getContactInfo(meetingId as string);
    }, []);

    const getContactInfo = async (id: string) => {
        const response: any = await dispatch(getSingleMeeting(id));
        verifyStatus(response);
    };

    return (
        <React.Fragment>
            <Heading label="View Meeting" backPath="/meeting" />
            <div className="pl-[50px]">
                <Breadcrumb labels={["Meeting", "Details"]} />
            </div>
            <div className="mt-4">
                {meetingInfo && <MeetingCard meeting={meetingInfo as Meeting} />}
            </div>
        </React.Fragment>
    );
};

export default ViewContact;
