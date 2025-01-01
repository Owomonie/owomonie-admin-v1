import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
// import forgetPasswordSlice from "./slice/forgot-passord";
import loginSlice from "./slice/login";
import getUserDetailsSlice from "./slice/get-user-details";
import getAllUsersSlice from "./slice/get-all-users";
import updateUserSlice from "./slice/update-user";
import notificationSlice from "./slice/notification";

const rootReducer = combineReducers({
  // forgetPassword: forgetPasswordSlice.reducer,
  login: loginSlice.reducer,
  userDetails: getUserDetailsSlice.reducer,
  allUsers: getAllUsersSlice.reducer,
  updateUser: updateUserSlice.reducer,
  notification: notificationSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
