import { v4 as uuid } from "uuid";
import { removeKeys } from "@/lib/utils";
import { FormValuesType } from "@/common/utils/formTypes";
import { authMiddleware } from "./mockMiddleware";
import meetingData from "@/app/fakeDB/meeting";
import { Meeting } from "@/types/meeting.types";

type Response = [number, { [key: string]: {} }];

interface Headers {
    userId: string;
}

const addMeeting = async (config: {
    data?: string;
    headers: Headers;
}): Promise<Response> => {
    const { headers, data } = config;
    const loggedInId = headers.userId;
    const isAuth = await authMiddleware(config as any);

    if (isAuth && loggedInId) {
        const parsedData = JSON.parse(data as string);
        const newId = uuid();
        const values = { id: newId, ...parsedData, createdBy: loggedInId };
        meetingData.push(values);

        return [201, { data: { message: "meeting Added", data: meetingData } }];
    }

    return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const getAllMeetings = async (config: {
    headers: Headers;
}): Promise<Response> => {
    const isAuth = await authMiddleware(config as any);
    const loggedInId = config.headers.userId;
    if (loggedInId && isAuth) {
        return [200, { data: { data: meetingData } }];
    }
    return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const deleteMeeting = async (config: {
    url: string;
    data: string;
}): Promise<Response> => {
    const isAuth = await authMiddleware(config as any);
    const meetingId = config.url.split("/")[4];
    const condition = meetingId != "null" && isAuth;

    if (condition) {
        const condition = (obj: Meeting) => obj.id === meetingId;

        for (let i = 0; i < meetingData.length; i++) {
            if (condition(meetingData[i])) {
                meetingData.splice(i, 1);
                i--;
            }
        }

        return [200, { data: { message: "Meeting Deleted" } }];
    }

    return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const updateMeeting = async (config: any): Promise<Response> => {
    const isAuth = await authMiddleware(config as any);
    const meetingId = config.url.split("/")[4];
    const condition = meetingId != "null" && isAuth;

    if (condition) {
        const { data } = config;
        const parsedData = JSON.parse(data);

        const index = meetingData.findIndex(
            (meeting: Meeting) => meeting.id === meetingId
        );

        if (index !== -1) {
            meetingData[index] = { ...meetingData[index], ...parsedData };
        }

        return [200, { data: { message: "Meeting Updated" } }];
    }
    return [401, { data: { message: "Invalid Token", status: 401 } }];
};

const getSingleMeeting = async (config: { url: string }): Promise<Response> => {
    const isAuth = await authMiddleware(config as any);
    const meetingId = config.url.split("/")[4];
    const condition = meetingId != "null" && isAuth;
    if (condition) {
        const meeting = meetingData.find((c) => c.id === meetingId) as FormValuesType;
        const updatedMeetingData = removeKeys(meeting, ["createdBy"]);
        return [200, { data: { data: updatedMeetingData } }];
    }

    return [401, { data: { message: "Invalid Token", status: 401 } }];
};

export default {
    addMeeting,
    getAllMeetings,
    deleteMeeting,
    updateMeeting,
    getSingleMeeting,
};
