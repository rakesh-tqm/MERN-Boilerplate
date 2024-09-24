import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { lsToken } from "@/common/constant/variables";
import axiosAPI from "@/common/DefaultAxios";
import {
  MOCK_DYNAMIC_FIELD,
  MOCK_DYNAMIC_FIELDS,
} from "@/common/constant/Endpoints";
import axios from "axios";
import { Option } from "@/types/customField.types";

interface InitialTypes {
  field: any;
  fields: any;
  formType: string;
  loading: boolean;
  showModal: boolean;
  fieldOptions: Option[] | [];
}

const initialFieldValues = {
  label: "",
  options: [],
  type: "text",
  validationRules: [],
};

const initialState: InitialTypes = {
  fields: [],
  formType: "",
  loading: false,
  fieldOptions: [],
  showModal: false,
  field: initialFieldValues,
};

export const addField = createAsyncThunk(
  "/add-field",
  async (values: any, { rejectWithValue }) => {
    const { loggedInId, formType, data } = values;
    try {
      const response = await axiosAPI.post(MOCK_DYNAMIC_FIELD, data, {
        headers: {
          Authorization: localStorage.getItem(lsToken),
          userId: loggedInId,
          formType,
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

export const getFormAllFields = createAsyncThunk(
  "/get-all-fields",
  async (values: any, { rejectWithValue }) => {
    const { loggedInId, formType } = values;
    try {
      const response = await axiosAPI.get(MOCK_DYNAMIC_FIELDS, {
        headers: {
          formType,
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

export const deleteField = createAsyncThunk(
  "/delete-field",
  async (values: any, { rejectWithValue }) => {
    const { uuid, loggedInId } = values;
    const url = `${MOCK_DYNAMIC_FIELD}${uuid}`;
    try {
      const response = await axiosAPI.delete(url, {
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

const customFieldSlice = createSlice({
  name: "customField",
  initialState,
  reducers: {
    setShowModal: (state, { payload }) => {
      state.showModal = payload;
    },

    setFieldOptions: (state, { payload }) => {
      state.fieldOptions = payload;
    },

    setFormType: (state, { payload }) => {
      state.formType = payload;
    },

    setField: (state, { payload }) => {
      state.field = payload;
    },

    setFieldInitialValues: (state) => {
      state.field = initialFieldValues;
    },

    setFields: (state, { payload }) => {
      state.fields = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addField.pending, (state) => {
        state.loading = true;
      })
      .addCase(addField.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addField.fulfilled, (state) => {
        state.loading = false;
      });

    builder
      .addCase(getFormAllFields.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFormAllFields.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getFormAllFields.fulfilled, (state, { payload }) => {
        state.fields = payload.data.data.data;
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

const { actions, reducer } = customFieldSlice;
export default reducer;
export const {
  setField,
  setFields,
  setShowModal,
  setFieldOptions,
  setFieldInitialValues,
} = actions;
