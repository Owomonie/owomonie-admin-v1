import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Containers/Dashboard";
import Login from "./Auth/Login";
import { RootState, useAppDispatch } from "./redux/store";
import { getUserDetails } from "./redux/slice/get-user-details";
import { useSelector } from "react-redux";
import { UserDetails } from "./utils/types";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Spinner from "./Components/Spinner";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading1 = useSelector((state: RootState) => state.userDetails.loading);
  const loading2 = useSelector((state: RootState) => state.login.loading);

  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );

  const userID = user._id;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(
        getUserDetails({
          token,
          extra: {
            navigate,
          },
        })
      );
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <>
      {(loading1 || loading2) && <Spinner />}
      {userID && <Sidebar />}
      <div className={`ml-[250px]`}>
        {userID && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
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
