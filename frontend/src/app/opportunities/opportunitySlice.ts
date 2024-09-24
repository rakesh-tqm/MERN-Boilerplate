import axios from "axios";
import axiosAPI from "@/common/DefaultAxios";
import { lsToken } from "@/common/constant/variables";
import { FormValuesType } from "@/common/utils/formTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  MOCK_OPPORTUNITIES,
  MOCK_OPPORTUNITY,
  MOCK_OPPORTUNITY_DETAILS,
} from "@/common/constant/Endpoints";

export const formValues = {
  city: "",
  name: "",
  email: "",
  state: "",
  phone: "",
  status: "",
  address: "",
  country: "",
  company: "",
  zipCode: "",
  valueRange: "",
  customerType: "",
  contactPerson: "",
  referralSource: "",
};

const vel = {
  address: "789 Maple St",
  city: "Mumbai",
  company: "76d11053-8a53-483a-8c6a-2a64681ca24a",
  contactPerson: "2a69b1c7-f0f6-4f08-8aef-7f8cf4009e9f",
  country: "India",
  createdBy: "1",
  customerType: "Regular",
  email: "emma@example.com",
  id: "f1e9cd22-2f51-489e-9baf-65f5d06c38c0",
  name: "Renewal Opportunity",
  phone: "7778889999",
  referralSource: "Referral Program",
  state: "Maharashtra",
  status: "Pending",
  valueRange: "1000",
  zipCode: "10115",
};

const detailed = {
  address: "123 Main St",
  city: "Mumbai",
  company: "ABC Company",
  contactPerson: "John Doe",
  country: "India",
  createdBy: "1",
  customerType: "Premium",
  email: "john@example.com",
  id: "b4a88a1e-29cc-4d4d-ba28-64826d04fbb2",
  name: "Sales Lead",
  phone: "1234567890",
  referralSource: "Google Ads",
  state: "Maharashtra",
  status: "Active",
  valueRange: "5000",
  zipCode: "10001",
};

interface Initials {
  formMode: string;
  loading: boolean;
  formValues: FormValuesType;
  opportunityId: null | string;
  opportunity: FormValuesType | null;
  opportunities: FormValuesType[] | [];
}

const initialState: Initials = {
  formValues,
  loading: false,
  opportunities: [],
  opportunity: null,
  formMode: "create",
  opportunityId: null,
};

export const addOpportunity = createAsyncThunk(
  "/add-opportunity",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(MOCK_OPPORTUNITY, values, {
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

export const allOpportunities = createAsyncThunk(
  "/all-opportunities",
  async (id: string | null, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(MOCK_OPPORTUNITIES, {
        headers: {
          userId: id,
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

export const getOpportunity = createAsyncThunk(
  "/get-opportunity",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`${MOCK_OPPORTUNITY}${id}`, {
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

export const deleteOpportunity = createAsyncThunk(
  "/delete-opportunity",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.delete(`${MOCK_OPPORTUNITY}${id}`, {
        headers: {
          Authorization: localStorage.getItem(lsToken),
        },
      });
      console.log(response);

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

export const updateOpportunity = createAsyncThunk(
  "/update-opportunity",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { id, data } = values;
      const response = await axiosAPI.patch(`${MOCK_OPPORTUNITY}${id}`, data, {
        headers: { Authorization: localStorage.getItem(lsToken) },
      });
      console.log(response);

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

export const detailedOpportunity = createAsyncThunk(
  "/detailed-opportunity",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`${MOCK_OPPORTUNITY_DETAILS}${id}`, {
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

const opportunitySlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    setFormValues: (state, { payload }) => {
      state.formValues = payload;
    },
    setFormMode: (state, { payload }) => {
      state.formMode = payload;
    },
    setOpportunity: (state, { payload }) => {
      state.opportunity = payload;
    },
    setOpportunityId: (state, { payload }) => {
      state.opportunityId = payload;
    },
    setInitialFormValues: (state) => {
      state.formValues = formValues;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOpportunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOpportunity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addOpportunity.fulfilled, (state) => {
        state.formValues = formValues;
        state.loading = false;
      });

    builder
      .addCase(allOpportunities.pending, (state) => {
        state.loading = true;
      })
      .addCase(allOpportunities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(allOpportunities.fulfilled, (state, { payload }) => {
        state.opportunities = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(getOpportunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOpportunity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOpportunity.fulfilled, (state, { payload }) => {
        state.formValues = payload.data.data.data;
        state.opportunity = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(updateOpportunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOpportunity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateOpportunity.fulfilled, (state) => {
        state.formValues = formValues;
        state.opportunityId = null;
        state.formMode = "create";
        state.opportunity = null;
        state.loading = false;
      });

    builder
      .addCase(deleteOpportunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOpportunity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteOpportunity.fulfilled, (state) => {
        state.loading = false;
      });

    builder
      .addCase(detailedOpportunity.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailedOpportunity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(detailedOpportunity.fulfilled, (state, { payload }) => {
        state.opportunity = payload.data.data.data;
        state.loading = false;
      });
  },
});

const { reducer, actions } = opportunitySlice;
export default reducer;
export const {
  setFormMode,
  setFormValues,
  setOpportunity,
  setOpportunityId,
  setInitialFormValues,
} = actions;
