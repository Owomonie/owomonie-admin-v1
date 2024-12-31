import { RiArrowDropDownLine } from "react-icons/ri";
import { NotificationFormState } from "../interface";

interface NewNotificationInputsProps {
  formState: NotificationFormState;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const NewNotificationInputs = ({
  formState,
  handleInputChange,
}: NewNotificationInputsProps) => {
  return (
    <div className="flex flex-col gap-5 mb-5">
      {/* Title Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="font-[350] text-xs text-[#5F5F5F]">
          SUBJECT
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
          MESSAGE
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

      {/* Recipients Select */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="recipients"
          className="font-[350] text-xs text-[#5F5F5F]">
          RECIPIENTS
        </label>
        <select
          id="recipients"
          name="recipients"
          value={formState.recipients}
          onChange={handleInputChange}
          className="appearance-none rounded-md py-2 pl-4 pr-8 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px] border border-[#D3D3D3] focus:outline-none">
          <option
            value=""
            className="text-[#7A808D]">
            Select Recipient
          </option>
          <option value="all">All Users</option>
          <option value="users">Registered Users</option>
          <option value="0">One User</option>
        </select>
        <RiArrowDropDownLine
          color="#898989"
          size={24}
          className="absolute top-8 right-1"
        />
      </div>

      {/* Type Select */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="type"
          className="font-[350] text-xs text-[#5F5F5F]">
          TYPE
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
          <option value="1">Email Only</option>
          <option value="2">Both Push Notification and Email</option>
        </select>
        <RiArrowDropDownLine
          color="#898989"
          size={24}
          className="absolute top-8 right-1"
        />
      </div>
    </div>
  );
};

export default NewNotificationInputs;
