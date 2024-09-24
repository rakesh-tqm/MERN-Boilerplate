import axios from "axios";
import axiosAPI from "@/common/DefaultAxios";
import { lsToken } from "@/common/constant/variables";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MOCK_DASHBOARD_TEST } from "@/common/constant/Endpoints";

const initialState = {
  loading: false,
};

export const testDashboard = createAsyncThunk(
  "/test-dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(MOCK_DASHBOARD_TEST, {
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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(testDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(testDashboard.rejected, (state) => {
        state.loading = false;
      })
      .addCase(testDashboard.fulfilled, (state) => {
        state.loading = false;
      });

    // builder
    //   .addCase(createContact.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(createContact.rejected, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(createContact.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //   });
  },
});

const { reducer, actions } = dashboardSlice;
export default reducer;
