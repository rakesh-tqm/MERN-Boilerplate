import { FormValuesType } from '@/common/utils/formTypes';
import { removeKeys } from '@/lib/utils';
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axiosAPI from "@/common/DefaultAxios";
import { MOCK_MEETING, MOCK_MEETINGS } from '@/common/constant/Endpoints';
import axios from 'axios';
import { lsToken } from '@/common/constant/variables';
import { Meeting } from '@/types/meeting.types';

export const meetingFormValues = {
    agenda: "",
    attendesContact: "",
    relatedTo: "",
    location: "",
    dateTime: "",
    notes: "",
};
interface Initials {
    meetingFormValues: FormValuesType;
    formMode: string;
    meetingsList: any[] | [];
    loading: boolean;
    meetingInfo: Meeting | null;
    meetingId: string | null;
}

const initialState: Initials = {
    meetingFormValues,
    formMode: "create",
    meetingsList: [],
    loading: false,
    meetingInfo: null,
    meetingId: null
};

export const createMeeting = createAsyncThunk(
    "/add-meeting",
    async (values: FormValuesType, { rejectWithValue }) => {
        try {
            const { loggedInId } = values;
            const modifiedValues = removeKeys(values, ["loggedInId"]);
            const response = await axiosAPI.post(MOCK_MEETING, modifiedValues, {
                headers: {
                    userId: loggedInId,
                    Authorization: localStorage.getItem(lsToken),
                },
            });
            return response;
        } catch (er) {
            if (axios.isAxiosError(er)) {
                return rejectWithValue(er.response?.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
);
export const updateMeeting = createAsyncThunk(
    "/update-contact",
    async (values: FormValuesType, { rejectWithValue }) => {
        try {
            const { id } = values;
            const modifiedValues = removeKeys(values, ["id", "email"]);
            const response = await axiosAPI.patch(
                `${MOCK_MEETING}${id}`,
                modifiedValues,
                {
                    headers: {
                        Authorization: localStorage.getItem(lsToken),
                    },
                }
            );

            return response;
        } catch (er) {
            if (axios.isAxiosError(er)) {
                return rejectWithValue(er.response?.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
);
export const getAllMeeting = createAsyncThunk(
    "/all-meeting",
    async (values: FormValuesType, { rejectWithValue }) => {
        try {
            const { loggedInId } = values;
            const response = await axiosAPI.get(MOCK_MEETING, {
                headers: {
                    userId: loggedInId,
                    Authorization: localStorage.getItem(lsToken),
                },
            });
            return response;
        } catch (er) {
            if (axios.isAxiosError(er)) {
                return rejectWithValue(er.response?.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
);

export const getSingleMeeting = createAsyncThunk(
    "/single-meeting",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosAPI.get(`${MOCK_MEETINGS}${id}`, {
                headers: {
                    Authorization: localStorage.getItem(lsToken),
                },
            });
            return response;
        } catch (er) {
            if (axios.isAxiosError(er)) {
                return rejectWithValue(er.response?.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
);
export const deleteMeeting = createAsyncThunk(
    "/delete-contact",
    async (values: FormValuesType, { rejectWithValue }) => {
        try {
            const url = `${MOCK_MEETING}${values.recordId}`;
            const response = await axiosAPI.delete(url, {
                headers: {
                    Authorization: localStorage.getItem(lsToken),
                },
            });
            return response;
        } catch (er) {
            if (axios.isAxiosError(er)) {
                return rejectWithValue(er.response?.data);
            } else {
                return rejectWithValue("An error occurred");
            }
        }
    }
);

export const meetingSlice = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        setMeetingFormValues: (state, { payload }) => {
            state.meetingFormValues = payload;
        },
        setMeetingList: (state, { payload }) => {
            state.meetingsList = payload;
        },
        setInitialFormValues: (state) => {
            state.meetingFormValues = meetingFormValues;
        },
        setMeetingId: (state, { payload }) => {
            state.meetingId = payload;
        },
        setFormMode: (state, { payload }) => {
            state.formMode = payload;
        },
        setMeetingInfo: (state, { payload }) => {
            state.meetingInfo = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMeeting.pending, (state) => {
                state.loading = true;
            })
            .addCase(createMeeting.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createMeeting.fulfilled, (state, { payload }) => {
                state.loading = false;
            }),
            builder
                .addCase(getAllMeeting.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getAllMeeting.rejected, (state) => {
                    state.loading = false;
                    state.meetingsList = [];
                })
                .addCase(getAllMeeting.fulfilled, (state, { payload }) => {
                    state.meetingsList = payload.data.data.data;
                    state.loading = false;
                }),
            builder
                .addCase(getSingleMeeting.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getSingleMeeting.rejected, (state) => {
                    state.loading = false;
                })
                .addCase(getSingleMeeting.fulfilled, (state, { payload }) => {
                    state.meetingFormValues = payload.data.data.data;
                    state.meetingInfo = payload.data.data.data;
                    state.loading = false;
                });
    }

})

// Action creators are generated for each case reducer function
const { actions, reducer } = meetingSlice;
export default reducer;
export const { setMeetingFormValues, setMeetingList, setInitialFormValues, setMeetingId, setFormMode, setMeetingInfo } = actions

// export default meetingSlice.reducer