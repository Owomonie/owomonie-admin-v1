import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { ExtraArgs } from "../../utils/types";

interface GetAllTransactionsError {
  message: string;
}

interface GetAllTransactionsState {
  loading: boolean;
  data: {
    transactions: object;
    totalPages: string;
  };
}

const axios = AxiosJSON();

export const getAllTransactions = createAsyncThunk(
  "auth/getAllTransactionsAsync",
  async (
    {
      token,
      extra,
      page = 1,
      limit = 20,
      startDate,
      endDate,
    }: {
      token: string;
      extra: ExtraArgs;
      page?: number;
      limit?: number;
      startDate?: string;
      endDate?: string;
    },
    { dispatch, rejectWithValue }
  ) => {
    const { navigate } = extra;

    try {
      dispatch(getAllTransactionsRequest());

      if (!token) {
        dispatch(getAllTransactionsComplete());
        navigate("/login");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (startDate && endDate) {
        const { data } = await axios.get(
          `admin-plaid/get-all-transactions?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`
        );
        dispatch(getAllTransactionsSuccess(data.data));
      } else {
        const { data } = await axios.get(
          `admin-plaid/get-all-transactions?page=${page}&limit=${limit}`
        );
        dispatch(getAllTransactionsSuccess(data.data));
      }
    } catch (error) {
      console.log("getAllTransactions Error", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<GetAllTransactionsError>;
      if (axiosError.response) {
        if (axiosError.response.status === 403) {
          errorMessage = "Access denied. Please log in again.";
        } else if (axiosError.response.data) {
          // Handle other errors
          errorMessage = axiosError.response.data.message;
        }
      }

      dispatch(getAllTransactionsComplete());

      navigate("/login");

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: GetAllTransactionsState = {
  loading: false,
  data: {
    transactions: [],
    totalPages: "",
  },
};

const getAllTransactionsSlice = createSlice({
  name: "getAllTransactions",
  initialState,
  reducers: {
    getAllTransactionsRequest: (state) => {
      state.loading = true;
    },

    getAllTransactionsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    getAllTransactionsComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  getAllTransactionsComplete,
  getAllTransactionsRequest,
  getAllTransactionsSuccess,
} = getAllTransactionsSlice.actions;

export default getAllTransactionsSlice;
