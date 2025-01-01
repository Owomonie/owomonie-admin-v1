import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./auth/Login";
import { RootState, useAppDispatch } from "./redux/store";
import { getUserDetails } from "./redux/slice/get-user-details";
import { UserDetails } from "./utils/types";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Spinner from "./components/Spinner";
import UserManagement from "./containers/UserManagement";
import Notifications from "./containers/Notifications";
import NewNotification from "./containers/Notifications/NewNotification";
import { getAllUsers } from "./redux/slice/get-all-users";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading1 = useSelector((state: RootState) => state.userDetails.loading);
  const loading2 = useSelector((state: RootState) => state.login.loading);
  const loading3 = useSelector((state: RootState) => state.updateUser.loading);
  const loading4 = useSelector(
    (state: RootState) => state.notification.loading
  );

  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );

  const userID = user._id;

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        await dispatch(
          getUserDetails({
            token,
            extra: {
              navigate,
            },
          })
        );
        await dispatch(
          getAllUsers({
            token,
            extra: {
              navigate,
            },
          })
        );
      } else {
        navigate("/login");
      }
    };

    fetchDetails();
  }, [dispatch, navigate]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
      />

      {(loading1 || loading2 || loading3 || loading4) && <Spinner />}
      {userID && <Sidebar />}
      <div className={`ml-[250px]`}>
        {userID && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={<UserManagement />}
          />
          <Route
            path="/notifications"
            element={<Notifications />}
          />
          <Route
            path="/notifications/new"
            element={<NewNotification />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
