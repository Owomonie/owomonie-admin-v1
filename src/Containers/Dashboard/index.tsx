import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserDetails } from "../../utils/types";

const Dashboard: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );
  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
};

export default Dashboard;
