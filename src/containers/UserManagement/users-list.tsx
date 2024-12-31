import React from "react";
import { Users } from "../../utils/types";

interface UsersListProps {
  users: Users[];
  selectedFilterStatus: string;
  searchQuery: string;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  selectedFilterStatus,
  searchQuery,
}) => {
  const getEmptyMessage = () => {
    switch (selectedFilterStatus) {
      case "all":
        return `No User available for ${searchQuery}`;
      case "active":
        return "No Active User available.";
      case "suspended":
        return "No Suspended User available.";
      default:
        return "No users match the selected filter.";
    }
  };

  return (
    <div className="mt-10">
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className="p-4 border-b border-gray-200 text-[#151515] text-sm">
            {user.firstName} {user.lastName}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center text-2xl">
          {getEmptyMessage()}
        </p>
      )}
    </div>
  );
};

export default UsersList;
