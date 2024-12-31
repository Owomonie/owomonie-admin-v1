import React from "react";
import { Users } from "../../utils/types";
import { LuDot, LuUserRoundCheck } from "react-icons/lu";
import { LiaUserLockSolid } from "react-icons/lia";

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
        <table className="w-full">
          <thead className="">
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
                className="hover:bg-gray-50">
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
                        : "text-[#DC4D4D]"
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
                    />
                  ) : (
                    <LuUserRoundCheck
                      size={24}
                      color="#32C953"
                      className="ml-3 cursor-pointer"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center text-2xl">
          {getEmptyMessage()}
        </p>
      )}
    </div>
  );
};

export default UsersList;
