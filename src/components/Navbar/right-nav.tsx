import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { AvatarList } from "../../utils/avatars";
import { UserDetails } from "../../utils/types";
import { RootState } from "../../redux/store";

const searchIcon = new URL("../../assets/navicons/search.png", import.meta.url)
  .href;
const settingsIcon = new URL(
  "../../assets/navicons/settings.png",
  import.meta.url
).href;
const notificationIcon = new URL(
  "../../assets/navicons/notification.png",
  import.meta.url
).href;

const RightNavbar: React.FC = () => {
  const user = useSelector(
    (state: RootState) => state.userDetails.data as UserDetails
  );

  const avatarIndex = parseInt(user.avatar);
  const avatarSource = AvatarList[avatarIndex];

  return (
    <div className="flex gap-4">
      <div className="w-[300px] relative">
        <input
          type="text"
          placeholder="Search"
          className="border-[#D3D3D3] border rounded-3xl px-4 py-2 text-[12px] font-[450] text-[#5F5F5F] w-full"
        />
        <img
          src={searchIcon}
          alt="Search"
          className="w-5 h-5 absolute top-2 right-2"
        />
      </div>

      <NavLink to={"/settings"}>
        <img
          src={settingsIcon}
          alt="settings"
          className="w-7 h-7 "
        />
      </NavLink>
      <NavLink to={"/notifications"}>
        <img
          src={notificationIcon}
          alt="notifications"
          className="w-7 h-7"
        />
      </NavLink>
      <img
        src={avatarSource}
        alt="avatar"
        className="w-7 h-7 bg-[#1F79B0] rounded-full"
      />
    </div>
  );
};

export default RightNavbar;
