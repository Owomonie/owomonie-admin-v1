import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";

import { NotificationFormState } from "../interface";
import { RootState } from "../../../redux/store";
import { Users } from "../../../utils/types";

interface NewNotificationInputsProps {
  formState: NotificationFormState;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  userSelectedID: string;
  setUserSelectedID: React.Dispatch<React.SetStateAction<string>>;
}

const NewNotificationInputs = ({
  formState,
  handleInputChange,
  userSelectedID,
  setUserSelectedID,
}: NewNotificationInputsProps) => {
  const users = useSelector(
    (state: RootState) => state.allUsers.data as Users[]
  );

  const sortedUsers = [...users].sort((a, b) => a.email.localeCompare(b.email));

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    handleInputChange(event);
    if (formState.recipients !== "one") {
      setUserSelectedID("");
    }
  };

  return (
    <div className="flex flex-col gap-5 mb-5">
      {/* Recipients Select */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="recipients"
          className="font-[350] text-xs text-[#5F5F5F]">
          RECIPIENTS <small className="text-red-600 font-bold ml-3">*</small>
        </label>
        <select
          id="recipients"
          name="recipients"
          value={formState.recipients}
          onChange={handleRecipientChange}
          className="appearance-none rounded-md py-2 pl-4 pr-8 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px] border border-[#D3D3D3] focus:outline-none">
          <option
            value=""
            className="text-[#7A808D]">
            Select Recipient
          </option>
          <option value="all">All Users</option>
          <option value="users">Registered Users</option>
          <option value="one">One User</option>
        </select>
        <RiArrowDropDownLine
          color="#898989"
          size={24}
          className="absolute top-8 right-1"
        />
      </div>

      {/* Show User Select only if 'One User' is selected */}
      {formState.recipients === "one" && (
        <div className="flex flex-col gap-2 relative">
          <label
            htmlFor="user"
            className="font-[350] text-xs text-[#5F5F5F]">
            USERS <small className="text-red-600 font-bold ml-3">*</small>
          </label>
          <select
            id="user"
            name="user"
            value={userSelectedID}
            onChange={(e) => setUserSelectedID(e.target.value)}
            className="appearance-none rounded-md py-2 pl-4 pr-8 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px] border border-[#D3D3D3] focus:outline-none">
            <option
              value=""
              className="text-[#7A808D]">
              Select User
            </option>
            {sortedUsers.map((user) => (
              <option
                key={user.id}
                value={user.id}>
                {user.email} [Username: {user.userName}]
              </option>
            ))}
          </select>
          <RiArrowDropDownLine
            color="#898989"
            size={24}
            className="absolute top-8 right-1"
          />
        </div>
      )}

      {/* Type Select */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="type"
          className="font-[350] text-xs text-[#5F5F5F]">
          TYPE <small className="text-red-600 font-bold ml-3">*</small>
        </label>
        <select
          id="type"
          name="type"
          value={formState.type}
          onChange={handleInputChange}
          className="appearance-none rounded-md py-2 pl-4 pr-8 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px] border border-[#D3D3D3] focus:outline-none">
          <option
            value=""
            className="text-[#7A808D]">
            Select Type
          </option>
          <option value="0">Push Notification Only</option>
          {formState.recipients !== "all" && (
            <>
              <option value="1">Email Only</option>
              <option value="2">Both Push Notification and Email</option>
            </>
          )}
        </select>
        <RiArrowDropDownLine
          color="#898989"
          size={24}
          className="absolute top-8 right-1"
        />
      </div>

      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="font-[350] text-xs text-[#5F5F5F]">
          SUBJECT <small className="text-red-600 font-bold ml-3">*</small>
        </label>
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
          placeholder="Enter Title"
          className="rounded-md py-2 px-4 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px]"
        />
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-[350] text-xs text-[#5F5F5F]">
          MESSAGE <small className="text-red-600 font-bold ml-3">*</small>
        </label>
        <input
          type="text"
          name="message"
          value={formState.message}
          onChange={handleInputChange}
          placeholder="Enter Message Body"
          className="rounded-md py-2 px-4 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px]"
        />
      </div>
    </div>
  );
};

export default NewNotificationInputs;
