import { RiArrowDropDownLine } from "react-icons/ri";
const searchIcon = new URL("../../assets/navicons/search.png", import.meta.url)
  .href;

interface UserManagementHeaderProps {
  status: string;
  onStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const UserManagementHeader: React.FC<UserManagementHeaderProps> = ({
  status,
  onStatusChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[550] text-[23px] text-[#151515]">
            User Management
          </h1>
          <p className="font-[350] text-[15px] text-[#5F5F5F]">
            View and manage all OwoMonie Users
          </p>
        </div>
        <div className="relative">
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="appearance-none rounded-3xl py-2 pl-4 bg-[#EAEAEA] w-[200px] text-[#0F0F0F] font-[450] 
          text-[12px] border cursor-pointer border-[#D3D3D3] focus:outline-none">
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="suspended">Suspended Users</option>
          </select>
          <RiArrowDropDownLine
            color="#898989"
            size={27}
            className="absolute top-[6px] right-1"
          />
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Users"
          className="w-full border border-[#D3D3D3] font-[350] text-[15px] py-2 px-4 rounded-3xl"
        />
        <img
          src={searchIcon}
          alt="Search"
          className="w-5 h-5 absolute top-2 right-5"
        />
      </div>
    </div>
  );
};

export default UserManagementHeader;
