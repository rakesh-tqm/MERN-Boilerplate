import axios from "axios";
import { removeKeys } from "@/lib/utils";
import axiosAPI from "@/common/DefaultAxios";
import { lsToken } from "@/common/constant/variables";
import { FormValuesType } from "@/common/utils/formTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MOCK_COMPANIES, MOCK_COMPANY } from "@/common/constant/Endpoints";

export const companyFormValues = {
  company_name: "",
  company_size: "",
  company_type: "",
  company_phone: "",
  company_email: "",
  company_website: "",
  company_description: "",
  billing_pin: "",
  billing_city: "",
  billing_state: "",
  billing_country: "",
  billing_address_first: "",
  billing_address_second: "",
  shipping_pin: "",
  shipping_city: "",
  shipping_state: "",
  shipping_country: "",
  shipping_address_first: "",
  shipping_address_second: "",
};

const sameAsBillingFormValues = {
  sameAsBilling: [],
};

interface Initials {
  formMode: string;
  loading: boolean;
  companyId: string | null;
  companies: FormValuesType[] | [];
  companyFormValues: FormValuesType;
  companyInfo: FormValuesType | null;
  sameAsBillingFormValues: FormValuesType;
}

const initialState: Initials = {
  companies: [],
  loading: false,
  companyId: null,
  companyInfo: null,
  companyFormValues,
  formMode: "create",
  sameAsBillingFormValues,
};

export const addCompany = createAsyncThunk(
  "/add-company",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { loggedInId } = values;
      const modifiedValues = removeKeys(values, ["loggedInId"]);
      const response = await axiosAPI.post(MOCK_COMPANY, modifiedValues, {
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

export const getAllCompany = createAsyncThunk(
  "/all-companies",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { loggedInId } = values;
      const response = await axiosAPI.get(MOCK_COMPANIES, {
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

export const getCompany = createAsyncThunk(
  "/get-company",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`${MOCK_COMPANY}/${id}`, {
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

export const updateCompany = createAsyncThunk(
  "/update-company",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { id } = values;
      const response = await axiosAPI.patch(`${MOCK_COMPANY}/${id}`, values, {
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

export const deleteCompany = createAsyncThunk(
  "/delete-company",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { recordId } = values;
      const url = `${MOCK_COMPANY}/${recordId}`;
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

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setFormMode: (state, { payload }) => {
      state.formMode = payload;
    },
    setCompanyId: (state, { payload }) => {
      state.companyId = payload;
    },
    setInitialFormValues: (state) => {
      state.companyFormValues = companyFormValues;
    },
    setCompanyFormValues: (state, { payload }) => {
      state.companyFormValues = payload;
    },
    setCompany: (state, { payload }) => {
      state.companyInfo = payload;
    },
    setInitialSameAsBilling: (state) => {
      state.sameAsBillingFormValues = sameAsBillingFormValues;
    },
    setSameAsBillingFormValues: (state, { payload }) => {
      state.sameAsBillingFormValues = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCompany.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCompany.fulfilled, (state) => {
        state.sameAsBillingFormValues = sameAsBillingFormValues;
        state.companyFormValues = companyFormValues;
        state.loading = false;
      });

    builder
      .addCase(getAllCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompany.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllCompany.fulfilled, (state, { payload }) => {
        state.companies = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(getCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompany.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCompany.fulfilled, (state, { payload }) => {
        const companyData = payload.data.data.data;
        state.companyFormValues = companyData;
        state.companyInfo = companyData;
        state.loading = false;
      });

    builder
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompany.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateCompany.fulfilled, (state) => {
        state.sameAsBillingFormValues = sameAsBillingFormValues;
        state.companyFormValues = companyFormValues;
        state.formMode = "create";
        state.companyId = null;
        state.loading = false;
      });

    builder
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCompany.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
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

const { reducer, actions } = companySlice;
export default reducer;
export const {
  setCompany,
  setFormMode,
  setCompanyId,
  setCompanyFormValues,
  setInitialFormValues,
  setInitialSameAsBilling,
  setSameAsBillingFormValues,
} = actions;
