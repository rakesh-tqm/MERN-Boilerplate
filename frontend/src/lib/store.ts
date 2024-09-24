import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/auth/AuthSlice";
import taskReducer from "@/app/tasks/tasksSlice";
import companyReducer from "@/app/companies/companySlice";
import wizardReducer from "@/common/ui/wizard/wizardSlice";
import contactsReducer from "@/app/contacts/contactsSlice";
import dashboardReducer from "@/app/dashboard/dashboardSlice";
import opportunityReducer from "@/app/opportunities/opportunitySlice";
import customFieldReducer from "@/common/components/customField/customFieldSlice";
import meetingReducer from "@/app/meeting/meetingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      task: taskReducer,
      wizard: wizardReducer,
      company: companyReducer,
      meeting: meetingReducer,
      contacts: contactsReducer,
      dashobard: dashboardReducer,
      customField: customFieldReducer,
      opportunity: opportunityReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
