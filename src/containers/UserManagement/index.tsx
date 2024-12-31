import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Users } from "../../utils/types";
import UserManagementHeader from "./header";
import UsersList from "./users-list";
import { useState } from "react";

const UserManagement = () => {
  const [selectedFilterStatus, setSelectedFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const users = useSelector(
    (state: RootState) => state.allUsers.data as Users[]
  );

  const sortedUsers = [...users].sort((a, b) =>
    a.userName.localeCompare(b.userName)
  );

  const filteredUsers = sortedUsers.filter((user) => {
    const matchesStatus =
      selectedFilterStatus === "all" ||
      (selectedFilterStatus === "active" && user.status === 1) ||
      (selectedFilterStatus === "suspended" && user.status === -1);

    const matchesSearch =
      !searchQuery ||
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="px-6 py-4">
      <UserManagementHeader
        status={selectedFilterStatus}
        onStatusChange={setSelectedFilterStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <UsersList
        users={filteredUsers}
        selectedFilterStatus={selectedFilterStatus}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default UserManagement;
