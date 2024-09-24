import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Or your preferred HTTP client

// Interface for user data
interface User {
  name: string;
  email: string;
  password: string;
}

// Initial state for the user slice
const initialState = {
  user: null as User | null,
  loading: false,
  error: null as string | null,
};

export const signupUser = createAsyncThunk(
  "user/signup",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/signup", userData);
      return response.data; // Assuming your backend returns user data after signup
    } catch (error: any) {             
      const message = error.response?.data?.message || "Signup failed";
      return rejectWithValue(message as string);
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}, // Add reducers for form field updates or other actions
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
