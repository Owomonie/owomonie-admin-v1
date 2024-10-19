import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Containers/Dashboard";
import Login from "./Auth/Login";
import { useAppDispatch } from "./redux/store";
import { getUserDetails } from "./redux/slice/get-user-details";

const AppRoutes: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const location = useLocation();

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
    }
  }, [dispatch, navigate]);

  //   const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* !isLoginPage &&  /* Sidebar * Navbar  */}

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
    </>
  );
};

export default AppRoutes;
