import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { getUserDetails } from "./get-user-details";
import { ExtraArgs } from "../../utils/types";

interface LoginError {
  message: string;
}

interface LoginState {
  loading: boolean;
}

const axios = AxiosJSON();

export const loginUser = createAsyncThunk(
  "auth/loginAsync",
  async (
    {
      email,
      password,
      extra,
    }: { email: string; password: string; extra: ExtraArgs },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const { navigate } = extra;

      dispatch(loginRequest());

      const { data } = await axios.post("login", {
        email,
        password,
      });

      if (!data.isAdmin) return;

      localStorage.setItem("authToken", data?.token);

      await dispatch(
        getUserDetails({
          token: data?.token,
          extra,
        })
      );

      dispatch(loginComplete());

      navigate("/");
    } catch (error) {
      console.log("Login Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<LoginError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(loginComplete());

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: LoginState = {
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },

    loginComplete: (state) => {
      state.loading = false;
    },
  },
});

export const { loginComplete, loginRequest } = loginSlice.actions;

export default loginSlice;
