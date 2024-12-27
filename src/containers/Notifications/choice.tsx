import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const NotificationChoiceData = [
  {
    title: "Create new notification",
    icon: <AiOutlinePlus size={30} />,
    link: "/notifications/new",
  },
  {
    title: "Choose from templates",
    icon: <MdOutlineLibraryBooks size={30} />,
    link: "/notifications/templates",
  },
  {
    title: "Notification Groups",
    icon: <PiUsersThree size={30} />,
    link: "/notifications/groups",
  },
];

const NotificationChoice: React.FC = () => {
  return (
    <div className="mt-10 flex gap-5 justify-between">
      {NotificationChoiceData.map((item) => (
        <NavLink
          to={item.link}
          key={item.title}
          className="border flex flex-col w-full gap-5 py-12 items-center rounded-3xl border-[#D3D3D3] hover:bg-[#1F79B0] hover:border-[#1F79B0] transition-all duration-200 ease-in-out text-[#151515] hover:text-[#FFFFFF]">
          <div className="p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-[#FFFFFF] bg-[#1F79B0] hover:text-[#1F79B0] text-white">
            {item.icon}
          </div>
          <p className="text-[15px] font-[450]">{item.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default NotificationChoice;
