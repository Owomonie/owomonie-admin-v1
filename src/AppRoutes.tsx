import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./auth/Login";
import { RootState, useAppDispatch } from "./redux/store";
import { getAllUsers } from "./redux/slice/get-all-users";
import { getUserDetails } from "./redux/slice/get-user-details";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Spinner from "./components/Spinner";
import UserManagement from "./containers/UserManagement";
import Notifications from "./containers/Notifications";
import NewNotification from "./containers/Notifications/NewNotification";
import DraftNotifications from "./containers/Notifications/DraftNotifications";
import SentNotifications from "./containers/Notifications/SentNotifications";
import Transactions from "./containers/Transactions";
import { getAllTransactions } from "./redux/slice/get-all-transactions";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [initialLoading, setInitialLoading] = useState(true);

  const loading1 = useSelector((state: RootState) => state.userDetails.loading);
  const loading2 = useSelector((state: RootState) => state.login.loading);
  const loading3 = useSelector((state: RootState) => state.updateUser.loading);
  const loading4 = useSelector(
    (state: RootState) => state.notification.loading
  );

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          navigate("/login");
          return;
        }

        await dispatch(
          getUserDetails({
            token,
            extra: { navigate },
          })
        );

        await dispatch(
          getAllUsers({
            token,
            extra: { navigate },
          })
        );

        await dispatch(
          getAllTransactions({
            token,
            extra: { navigate },
          })
        );
      } catch (error) {
        console.error("Error fetching details:", error);

        navigate("/login");
        return;
      } finally {
        setInitialLoading(false);
      }
    };
    fetchDetails();
  }, [dispatch, navigate]);

  if (initialLoading) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
      />
      {(loading1 || loading2 || loading3 || loading4) && <Spinner />}

      {location.pathname !== "/login" && (
        <>
          <Sidebar />
          <Navbar />
        </>
      )}
      <div className={`ml-[250px] mt-[80px]`}>
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
            path="/notifications/saved-drafts"
            element={<DraftNotifications />}
          />
          <Route
            path="/notifications/sent"
            element={<SentNotifications />}
          />
          <Route
            path="/transactions"
            element={<Transactions />}
          />
        </Routes>
      </div>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
