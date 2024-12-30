import { RiArrowDropDownLine } from "react-icons/ri";

const AddNotification: React.FC = () => {
  return (
    <div className="border border-[#D3D3D3] px-5 py-8 rounded-lg shadow-lg w-full mt-6 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="font-[350] text-xs text-[#5F5F5F]">
          SUBJECT
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          className="rounded-md py-2 px-4 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px]"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-[350] text-xs text-[#5F5F5F]">
          MESSAGE
        </label>
        <input
          type="text"
          placeholder="Enter Message Body"
          className="rounded-md py-2 px-4 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px]"
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="recipients"
          className="font-[350] text-xs text-[#5F5F5F]">
          RECIPIENTS
        </label>
        <select
          id="recipients"
          className="appearance-none rounded-md py-2 pl-4 pr-8 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px] border border-[#D3D3D3] focus:outline-none">
          <option
            value=""
            className="text-[#7A808D]">
            Select Recipient
          </option>
          <option value="all">All Users</option>
          <option value="users">Registered Users</option>
          <option value={0}>One User</option>
        </select>
        <RiArrowDropDownLine
          color="#898989"
          size={24}
          className="absolute top-8 right-1"
        />
      </div>

      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="type"
          className="font-[350] text-xs text-[#5F5F5F]">
          TYPE
        </label>
        <select
          id="type"
          className="appearance-none rounded-md py-2 pl-4 pr-8 bg-[#EAEAEA] text-[#0F0F0F] font-[350] text-[15px] border border-[#D3D3D3] focus:outline-none">
          <option
            value=""
            className="text-[#7A808D]">
            Select Type
          </option>
          <option value={0}>Push Notification Only</option>
          <option value={1}>Email Only</option>
          <option value={2}>Both Push Notification and Email</option>
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

export default AddNotification;
