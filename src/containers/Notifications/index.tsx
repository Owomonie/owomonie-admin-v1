import { NavLink } from "react-router-dom";

import { NotificationChoiceData } from "./choice";
import { NotificationChoice } from "./interface";
import { useAppDispatch } from "../../redux/store";
import {
  getDraftNotifications,
  getSentNotifications,
} from "../../redux/slice/notification";

const Notifications: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClickChoice = async (item: NotificationChoice) => {
    if (item.title === "Saved Draft Collection") {
      await dispatch(getDraftNotifications());
    } else if (item.title === "View Sent Notifications") {
      await dispatch(getSentNotifications());
    }
  };

  return (
    <div className="px-6 py-4">
      <div className="mt-10 grid-cols-3 grid gap-5 ">
        {NotificationChoiceData.map((item) => (
          <NavLink
            to={item.link}
            key={item.title}
            onClick={() => handleClickChoice(item)}
            className="border flex flex-col w-full gap-5 py-12 items-center rounded-3xl border-[#D3D3D3] hover:bg-[#1F79B0] hover:border-[#1F79B0] transition-all duration-200 ease-in-out text-[#151515] hover:text-[#FFFFFF]">
            <div className="p-2 rounded-full transition-all duration-200 ease-in-out hover:bg-[#FFFFFF] bg-[#1F79B0] hover:text-[#1F79B0] text-white">
              {item.icon}
            </div>
            <p className="text-[15px] font-[450]">{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
