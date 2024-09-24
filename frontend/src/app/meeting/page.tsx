"use client";
import React, { useEffect } from "react";
import Heading from "@/common/ui/Heading";
import Breadcrumb from "@/common/ui/Breadcrumb";
import { getAllMeeting, setInitialFormValues } from "./meetingSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useNotify from "@/lib/customHooks/useNotify";
import MeetingListTable from "@/common/ui/Tables/MeetingTable";

const Meeting: React.FC = () => {
  const { verifyStatus } = useNotify();
  const dispatch = useAppDispatch();
  const { id: loggedInId } = useAppSelector((state) => state.auth);
  const { meetingsList } = useAppSelector((state) => state.meeting);

  const fetchData = async (id: string) => {
    const response = await dispatch(getAllMeeting({ loggedInId: id }));
    verifyStatus(response, true);
  };
  useEffect(() => {
    fetchData(loggedInId as string);
    dispatch(setInitialFormValues());
  }, []);
  return (
    <div>
      <Heading label="Meetings" addLabel="Add" addPath="/meeting/create" />
      <Breadcrumb labels={["Meeting", "List"]} />
      {meetingsList?.length > 0 ? (
        <MeetingListTable data={meetingsList} />
      ) : (
        <div className="flex items-center justify-center mt-12">
          <p className="font-bold text-gray-400 text-xl">No Records !</p>
        </div>
      )}
    </div>
  );
};

export default Meeting;
