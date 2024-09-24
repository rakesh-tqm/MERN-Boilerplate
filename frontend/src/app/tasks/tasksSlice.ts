import {
  MOCK_DETAILED_TASK,
  MOCK_TASK,
  MOCK_TASKS,
  MOCK_TASK_RELATEDTO_OPTIONS,
} from "@/common/constant/Endpoints";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValuesType } from "@/common/utils/formTypes";
import { lsToken } from "@/common/constant/variables";
import axiosAPI from "@/common/DefaultAxios";
import axios from "axios";
import { SelectOptionsType } from "@/types/ui.types";

export const formValues = {
  url: "",
  notes: "",
  title: "",
  endDate: "",
  startDate: "",
  description: "",
  relatedTo: "contact",
  assignmentToLead: "",
};

interface Initials {
  model: boolean;
  loading: boolean;
  formMode: string;
  taskId: string | null;
  formValues: FormValuesType;
  task: FormValuesType | null;
  tasks: FormValuesType[] | [];
  relatedToOptions: SelectOptionsType[] | [];
}

const initialState: Initials = {
  tasks: [],
  task: null,
  formValues,
  taskId: null,
  model: false,
  loading: false,
  formMode: "create",
  relatedToOptions: [],
};

export const getRelatedToOptions = createAsyncThunk(
  "/get-related-to-options",
  async (values: FormValuesType, { rejectWithValue }) => {
    const { relatedTo, id } = values;
    try {
      const url = `${MOCK_TASK_RELATEDTO_OPTIONS}/${relatedTo}`;
      const response = await axiosAPI.get(url, {
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

export const addTask = createAsyncThunk(
  "/add-task",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { id, data } = values;
      const response = await axiosAPI.post(MOCK_TASK, data, {
        headers: {
          Authorization: localStorage.getItem(lsToken),
          userId: id,
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

export const getAllTasks = createAsyncThunk(
  "get-all-tasks",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(MOCK_TASKS, {
        headers: {
          Authorization: localStorage.getItem(lsToken),
          userId: id,
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

export const deleteTask = createAsyncThunk(
  "/delete-task",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.delete(`${MOCK_TASK}${id}`, {
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

export const detailedTask = createAsyncThunk(
  "/detailed-task",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`${MOCK_DETAILED_TASK}${id}`, {
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

export const getTask = createAsyncThunk(
  "/get-task",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.get(`${MOCK_TASK}${id}`, {
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

export const updateTask = createAsyncThunk(
  "/update-task",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const { id, data } = values;
      const response = await axiosAPI.patch(`${MOCK_TASK}${id}`, data, {
        headers: { Authorization: localStorage.getItem(lsToken) },
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

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state.model = payload;
    },
    setFormMode: (state, { payload }) => {
      state.formMode = payload;
    },
    setFormValues: (state, { payload }) => {
      state.formValues = payload;
    },
    cancelModel: (state) => {
      state.model = false;
      state.formValues = formValues;
    },
    setTaskId: (state, { payload }) => {
      state.taskId = payload;
    },

    setInitialFormValues: (state) => {
      state.formValues = formValues;
    },

    setTask: (state, { payload }) => {
      state.task = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRelatedToOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRelatedToOptions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRelatedToOptions.fulfilled, (state, { payload }) => {
        state.relatedToOptions = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        console.log("payload", payload.data.data.data);
        state.loading = false;
      });

    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(detailedTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailedTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(detailedTask.fulfilled, (state, { payload }) => {
        state.task = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(getTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTask.fulfilled, (state, { payload }) => {
        state.formValues = payload.data.data.data;
        state.task = payload.data.data.data;
        state.loading = false;
      });

    builder
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        console.log("payload", payload.data.data.data);
        // state.opportunity = payload.data.data.data;
        state.loading = false;
      });
  },
});

const { actions, reducer } = tasksSlice;
export const {
  setTask,
  setTaskId,
  toggleModal,
  cancelModel,
  setFormMode,
  setFormValues,
  setInitialFormValues,
} = actions;
export default reducer;
