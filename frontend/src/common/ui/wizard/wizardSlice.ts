import { createSlice } from "@reduxjs/toolkit";

interface Initials {
  currentStep: number;
}

const initialState: Initials = {
  currentStep: 1,
};

const wizardSlice = createSlice({
  name: "wizard",
  initialState,
  reducers: {
    setCurrentStep: (state, { payload }) => {
      state.currentStep = payload;
    },
  },
});

const { reducer, actions } = wizardSlice;
export const { setCurrentStep } = actions;
export default reducer;
