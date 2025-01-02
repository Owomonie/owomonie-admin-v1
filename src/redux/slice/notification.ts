import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosJSON } from "../axios";
import { ExtraArgs } from "../../utils/types";
import { toast } from "react-toastify";

interface NotificationError {
  message: string;
}

interface NotificationState {
  loading: boolean;
  draftNotifications: object;
  sentNotifications: object;
}

const axios = AxiosJSON();

export const sendNotification = createAsyncThunk(
  "auth/notificationStatusAsync",
  async (
    {
      title,
      body,
      type,
      status,
      categories,
      recipient,
      extra,
    }: {
      title: string;
      body: string;
      type: string;
      status: number;
      categories: string[];
      recipient: string;
      extra: ExtraArgs;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(notificationRequest());

      const { navigate } = extra;

      const token = localStorage.getItem("authToken");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.post("notification/send", {
        title,
        body,
        type,
        status: status.toString(),
        categories,
        recipient,
      });

      dispatch(notificationComplete());

      navigate("/notifications");

      toast.success(data?.message);
    } catch (error) {
      console.log("Send Notification", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<NotificationError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(notificationComplete());

      toast.error(errorMessage);

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getDraftNotifications = createAsyncThunk(
  "auth/notificationStatusAsync",
  async (_cre, { dispatch, rejectWithValue }) => {
    try {
      dispatch(notificationRequest());

      const token = localStorage.getItem("authToken");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("notification/drafts");

      dispatch(draftNotificationsComplete(data?.draftNotifications));
    } catch (error) {
      console.log("GET Draft Notification", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<NotificationError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(notificationComplete());

      toast.error(errorMessage);

      return rejectWithValue({ message: errorMessage });
    }
  }
);

export const getSentNotifications = createAsyncThunk(
  "auth/notificationStatusAsync",
  async (_cre, { dispatch, rejectWithValue }) => {
    try {
      dispatch(notificationRequest());

      const token = localStorage.getItem("authToken");

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.get("notification/sent");

      dispatch(sentNotificationsComplete(data?.sentNotifications));
    } catch (error) {
      console.log("GET Sent Notification", error);
      let errorMessage = "Network Error";

      const axiosError = error as AxiosError<NotificationError>;
      if (axiosError.response && axiosError.response.data) {
        errorMessage = axiosError.response.data.message;
      }

      dispatch(notificationComplete());

      toast.error(errorMessage);

      return rejectWithValue({ message: errorMessage });
    }
  }
);

const initialState: NotificationState = {
  loading: false,
  draftNotifications: [],
  sentNotifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationRequest: (state) => {
      state.loading = true;
    },

    draftNotificationsComplete: (state, action) => {
      state.loading = false;
      state.draftNotifications = action.payload;
    },

    sentNotificationsComplete: (state, action) => {
      state.loading = false;
      state.sentNotifications = action.payload;
    },

    notificationComplete: (state) => {
      state.loading = false;
    },
  },
});

export const {
  notificationComplete,
  draftNotificationsComplete,
  sentNotificationsComplete,
  notificationRequest,
} = notificationSlice.actions;

export default notificationSlice;
