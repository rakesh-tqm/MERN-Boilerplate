import {
  lsEmail,
  lsForgetEmail,
  lsForgetToken,
  lsPassword,
  lsToken,
} from "@/common/constant/variables";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FormValuesType } from "@/common/utils/formTypes";
import axiosAPI from "@/common/DefaultAxios";
import axios from "axios";
import {
  MOCK_SIGN_UP,
  MOCK_SIGN_IN,
  MOCK_RESET_PASSWORD,
  MOCK_FORGET_PASSWORD,
  MOCK_UPDATE_PASSWORD,
} from "@/common/constant/Endpoints";

interface Initials {
  loading: boolean;
  id: string | null;
  token: number | null;
  loginValues: FormValuesType;
  signupValues: FormValuesType;
  confirmEmailValues: FormValuesType;
  resetPasswordValues: FormValuesType;
  changePasswordValues: FormValuesType;
  forgetPasswordValues: FormValuesType;
}

const loginValues = {
  email: "",
  password: "",
  rememberMe: [],
};

const confirmEmailValues = {
  email: "",
};

const signupValues = {
  email: "",
  terms: [],
  lastName: "",
  password: "",
  firstName: "",
  confirmPassword: "",
};

const changePasswordValues = {
  password: "",
  confirmPassword: "",
};

const forgetPasswordValues = {
  email: "",
};

const resetPasswordValues = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

const initialState: Initials = {
  id: null,
  token: null,
  loginValues,
  signupValues,
  loading: false,
  confirmEmailValues,
  resetPasswordValues,
  changePasswordValues,
  forgetPasswordValues,
};

export const loginUser = createAsyncThunk(
  "/login-user",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(MOCK_SIGN_IN, values, {
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

export const signupUser = createAsyncThunk(
  "/signup-user",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(MOCK_SIGN_UP, values);
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

export const confirmEmail = createAsyncThunk(
  "/confirm-email",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(MOCK_FORGET_PASSWORD, values);
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

export const updatePassword = createAsyncThunk(
  "/update-password",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.patch(MOCK_UPDATE_PASSWORD, values, {
        headers: {
          Authorization: localStorage.getItem(lsForgetToken),
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

export const resetPassword = createAsyncThunk(
  "/reset-password",
  async (values: FormValuesType, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(MOCK_RESET_PASSWORD, values);
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

export const checkToken = createAsyncThunk(
  "/check-token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosAPI.post(MOCK_SIGN_IN, {
        email: localStorage.getItem(lsEmail),
        password: localStorage.getItem(lsPassword),
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

export const refreshToken = createAsyncThunk(
  "/refresh-token",
  async (_, { rejectWithValue }) => {
    try {
      const data = {
        email: localStorage.getItem(lsEmail),
        password: localStorage.getItem(lsPassword),
      };
      const response = await axiosAPI.post(MOCK_SIGN_IN, data);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },

    setLoginValues: (state, { payload }) => {
      state.loginValues = payload;
    },

    resetLoginValues: (state) => {
      state.loginValues = loginValues;
    },

    setSignupValues: (state, { payload }) => {
      state.signupValues = payload;
    },

    resetSignupValues: (state) => {
      state.signupValues = signupValues;
    },

    setChangePasswordValues: (state, { payload }) => {
      state.changePasswordValues = payload;
    },

    setConfirmEmailValues: (state, { payload }) => {
      state.confirmEmailValues = payload;
    },

    setForgetPasswordValues: (state, { payload }) => {
      state.forgetPasswordValues = payload;
    },

    setResetPasswordValues: (state, { payload }) => {
      state.resetPasswordValues = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.token = null;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { token, id } = payload.data.data;
        state.id = id;
        state.loading = false;
        state.token = token;
      });

    // builder
    //   .addCase(checkToken.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(checkToken.rejected, (state) => {
    //     state.loading = false;
    //     state.token = null;
    //   })
    //   .addCase(checkToken.fulfilled, (state, { payload }) => {
    //     const { token } = payload.data.data;
    //     state.token = token;
    //     state.loading = false;
    //   });

    builder
      .addCase(confirmEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmEmail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(confirmEmail.fulfilled, (state, { payload }) => {
        state.forgetPasswordValues = forgetPasswordValues;
        const { token, email } = payload.data.data;
        localStorage.setItem(lsForgetEmail, email);
        localStorage.setItem(lsForgetToken, token);
        state.loading = false;
      });

    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.changePasswordValues = changePasswordValues;
        localStorage.removeItem(lsForgetEmail);
        localStorage.removeItem(lsForgetToken);
        state.loading = false;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.resetPasswordValues = resetPasswordValues;
        state.loading = false;
      });
  },
});

const { actions, reducer } = authSlice;
export default reducer;
export const {
  logout,
  setLoginValues,
  setSignupValues,
  setConfirmEmailValues,
  setChangePasswordValues,
  setForgetPasswordValues,
  setResetPasswordValues,
  resetSignupValues,
  resetLoginValues,
} = actions;
