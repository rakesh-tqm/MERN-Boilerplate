import { MOCK_CONTACT, MOCK_CONTACTS } from "@/common/constant/Endpoints";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValuesType } from "@/common/utils/formTypes";
import { Contact } from "@/types/contacts.types";
import axiosAPI from "@/common/DefaultAxios";
import { removeKeys } from "@/lib/utils";
import axios from "axios";
import { lsToken } from "@/common/constant/variables";

export const contactFormValues = {
  communicationChannel: "",
  phoneNumber: "",
  department: "",
  firstName: "",
  facebook: "",
  linkedin: "",
  birthday: "",
  lastName: "",
  jobTitle: "",
  address: "",
  twitter: "",
  email: "",
  notes: "",
};

interface Initials {
  formMode: string;
  loading: boolean;
  contacts: any[] | [];
  contactId: string | null;
  contactInfo: Contact | null;
  contactFormValues: FormValuesType;
}

const initialState: Initials = {
  contacts: [],
  loading: false,
  contactId: null,
  contactInfo: null,
  formMode: "create",
  contactFormValues,
};

export const createContact = createAsyncThunk(
  "/add-contact",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { loggedInId } = values;
      const modifiedValues = removeKeys(values, ["loggedInId"]);
      const response = await axiosAPI.post(MOCK_CONTACT, modifiedValues, {
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

export const getAllContact = createAsyncThunk(
  "/all-contact",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { loggedInId } = values;
      const response = await axiosAPI.get(MOCK_CONTACTS, {
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

export const updateContact = createAsyncThunk(
  "/update-contact",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { id } = values;
      const modifiedValues = removeKeys(values, ["id", "email"]);
      const response = await axiosAPI.patch(
        `${MOCK_CONTACT}${id}`,
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

export const deleteContact = createAsyncThunk(
  "/delete-contact",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const url = `${MOCK_CONTACT}${values.recordId}`;
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

export const getSingleContact = createAsyncThunk(
  "/single-contact",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`${MOCK_CONTACT}${id}`, {
        headers: {
          Authorization: localStorage.getItem(lsToken),
        },
      });
      return response;
    } catch (er) {
      console.log("er", er);

      if (axios.isAxiosError(er)) {
        return rejectWithValue(er.response?.data);
      } else {
        return rejectWithValue("An error occurred");
      }
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setFormMode: (state, { payload }) => {
      state.formMode = payload;
    },

    setContacts: (state, { payload }) => {
      state.contacts = payload;
    },

    setContactId: (state, { payload }) => {
      state.contactId = payload;
    },

    setContactFormValues: (state, { payload }) => {
      state.contactFormValues = payload;
    },

    setInitialFormValues: (state) => {
      state.contactFormValues = contactFormValues;
    },

    setContactInfo: (state, { payload }) => {
      state.contactInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContact.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createContact.fulfilled, (state, { payload }) => {
        state.loading = false;
      });

    builder
      .addCase(getAllContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllContact.rejected, (state) => {
        state.loading = false;
        state.contacts = [];
      })
      .addCase(getAllContact.fulfilled, (state, { payload }) => {
        state.contacts = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(getSingleContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleContact.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getSingleContact.fulfilled, (state, { payload }) => {
        state.contactFormValues = payload.data.data.data;
        state.contactInfo = payload.data.data.data;
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

const { actions, reducer } = contactsSlice;
export default reducer;
export const {
  setFormMode,
  setContacts,
  setContactId,
  setContactInfo,
  setContactFormValues,
  setInitialFormValues,
} = actions;
