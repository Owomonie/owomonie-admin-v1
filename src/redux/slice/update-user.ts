import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { ExtraArgs } from "../../utils/types";
import { toast } from "react-toastify";
import { getAllUsers } from "./get-all-users";

interface UpdateUserError {
  message: string;
}

interface UpdateUserState {
  loading: boolean;
}

const axios = AxiosJSON();

export const updateUserStatus = createAsyncThunk(
  "auth/updateUserStatusAsync",
  async (
    {
      status,
      userId,
      extra,
    }: { status: number; userId: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateUserRequest());

      const token = localStorage.getItem("authToken");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.patch(`update-user/status/${userId}`, {
        status,
      });

      if (token) {
        await dispatch(
          getAllUsers({
            token,
            extra,
          })
        );
      }

      dispatch(updateUserComplete());

      toast.success(data?.message);
    } catch (error) {
      console.log("Update User Status", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<UpdateUserError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(updateUserComplete());

      toast.error(errorMessage);

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: UpdateUserState = {
  loading: false,
};

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
    },

    updateUserComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { updateUserComplete, updateUserRequest } =
  updateUserSlice.actions;

export default updateUserSlice;
