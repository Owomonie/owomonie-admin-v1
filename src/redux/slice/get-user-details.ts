import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { ExtraArgs } from "../../types";

interface GetUserDetailsError {
  message: string;
}

interface GetUserDetailsState {
  loading: boolean;
  data: object;
}

const axios = AxiosJSON();

export const getUserDetails = createAsyncThunk(
  "auth/getUserDetailsAsync",
  async (
    { token, extra }: { token: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getUserDetailsRequest());

      if (!token) {
        navigate("/login");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("get-user-details");
      console.log(data);

      dispatch(getUserDetailsSuccess(data.user));
    } catch (error) {
      console.log("getUserDetails Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<GetUserDetailsError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          // Handle 403 Forbidden error

          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      navigate("/login");

      dispatch(getUserDetailsComplete());

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: GetUserDetailsState = {
  loading: false,
  data: [],
};

const getUserDetailsSlice = createSlice({
  name: "getUserDetails",
  initialState,
  reducers: {
    getUserDetailsRequest: (state) => {
      state.loading = true;
    },

    getUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    getUserDetailsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getUserDetailsComplete,
  getUserDetailsRequest,
  getUserDetailsSuccess,
} = getUserDetailsSlice.actions;

export default getUserDetailsSlice;
