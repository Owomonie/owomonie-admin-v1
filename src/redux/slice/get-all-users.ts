import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { ExtraArgs } from "../../utils/types";

interface GetAllUsersError {
  message: string;
}

interface GetAllUsersState {
  loading: boolean;
  data: object;
}

const axios = AxiosJSON();

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsersAsync",
  async (
    { token, extra }: { token: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getAllUsersRequest());

      if (!token) {
        dispatch(getAllUsersComplete());
        navigate("/login");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("get-all-users");

      dispatch(getAllUsersSuccess(data.users));
    } catch (error) {
      console.log("getAllUsers Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<GetAllUsersError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error

          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getAllUsersComplete());

      navigate("/login");

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: GetAllUsersState = {
  loading: false,
  data: [],
};

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState,
  reducers: {
    getAllUsersRequest: (state) => {
      state.loading = true;
    },

    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    getAllUsersComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { getAllUsersComplete, getAllUsersRequest, getAllUsersSuccess } =
  getAllUsersSlice.actions;

export default getAllUsersSlice;
