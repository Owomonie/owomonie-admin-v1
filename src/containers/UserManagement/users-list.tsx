import React, { useState } from "react";
import { Users } from "../../utils/types";
import { LuDot, LuUserRoundCheck } from "react-icons/lu";
import { LiaUserLockSolid } from "react-icons/lia";
import { useAppDispatch } from "../../redux/store";
import { updateUserStatus } from "../../redux/slice/update-user";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    status: number;
    userName: string;
  } | null>(null);

  const changeStatus = async () => {
    if (selectedUser) {
      await dispatch(
        updateUserStatus({
          status: selectedUser.status,
          userId: selectedUser.id,
          extra: {
            navigate,
          },
        })
      );
      setShowModal(false);
      setSelectedUser(null);
    }
  };

  const openModal = (id: string, status: number, userName: string) => {
    setSelectedUser({ id, status, userName });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

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
        <>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                  USERNAME
                </th>
                <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                  EMAIL
                </th>
                <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                  REGISTRATION DATE
                </th>
                <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                  STATUS
                </th>
                <th className="text-left px-4 py-2 font-[350] text-xs text-[#5F5F5F] border-b">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-300">
                  <td className="font-[450] text-[15px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                    {user.userName}
                  </td>
                  <td className="font-[450] text-[15px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                    {user.email}
                  </td>
                  <td className="font-[450] text-[15px] text-[#151515] px-4 py-2 border-b border-[#EAEAEA]">
                    {new Date(user.registeredDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`border-b border-[#EAEAEA] px-4 py-2 font-[450] text-xs`}>
                    <div
                      className={`flex items-center rounded-2xl py-1 w-fit pr-3 ${
                        user.status === 1
                          ? "text-[#32C953] bg-[#32C95326]"
                          : "text-[#DC4D4D] bg-[#C9323226]"
                      }`}>
                      {
                        <LuDot
                          size={25}
                          className="mr-[-6px]"
                        />
                      }
                      {user.status === 1 ? "Active" : "Suspended"}
                    </div>
                  </td>
                  <td className="border-b border-[#EAEAEA] px-4 py-2">
                    {user.status === 1 ? (
                      <LiaUserLockSolid
                        size={24}
                        color="#C93232"
                        className="ml-3 cursor-pointer"
                        onClick={() => openModal(user.id, -1, user.userName)}
                      />
                    ) : (
                      <LuUserRoundCheck
                        size={24}
                        color="#32C953"
                        className="ml-3 cursor-pointer"
                        onClick={() => openModal(user.id, 1, user.userName)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold text-center">
                  {selectedUser.status === 1 ? "Activate User" : "Suspend User"}
                </h2>
                <p className="text-gray-600 my-4 text-center">
                  Are you sure you want to{" "}
                  {selectedUser.status === 1 ? "activate" : "suspend"} user{" "}
                  {selectedUser.userName} ?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={changeStatus}>
                    Confirm
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center text-2xl">
          {getEmptyMessage()}
        </p>
      )}
    </div>
  );
};

export default UsersList;
