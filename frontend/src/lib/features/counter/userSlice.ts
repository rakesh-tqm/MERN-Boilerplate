import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  token: string;
  email: string;
  password: string;
}

const dummyUsers: User[] = [
  {
    id: "sdfdsfsdfsdf32423425",
    email: "test1@gmail.com",
    password: "Admin@00",
    token: "your_mock_token1",
  },
  {
    id: "sdfdsfsdfsdf32423424",
    email: "test2@gmail.com",
    password: "password1234",
    token: "your_mock_token2",
  },
  {
    id: "sdfdsfsdfsdf32423426",
    email: "test3@gmail.com",
    password: "passworD1234*",
    token: "your_mock_token3",
  },
  {
    id: "sdfdsfsdfsdf32423427",
    email: "test4@gmail.com",
    password: "passworD123*",
    token: "your_mock_token5",
  },
];

interface InitialStates {
  loading: boolean;
  users: User[] | [];
}

const initialState: InitialStates = {
  loading: false,
  users: dummyUsers,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   state.data.push(action.payload.userData);
    // },
    // editUser(state, action) {
    //   const userIndex = state.data.findIndex(
    //     (user) => user.id === action.payload.userId
    //   );
    //   if (userIndex !== -1) {
    //     state.data[userIndex] = {
    //       ...state.data[userIndex],
    //       ...action.payload.updatedData,
    //     };
    //   }
    // },
    // removeUser(state, action) {
    //   const userIndex = state.data.findIndex(
    //     (user) => user.id === action.payload.userId
    //   );
    //   if (userIndex !== -1) {
    //     state.data.splice(userIndex, 1);
    //   }
    // },
  },
});

// export const { addUser, editUser, removeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.users;

export default userSlice.reducer;
