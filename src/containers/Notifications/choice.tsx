import { AiOutlinePlus } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { RiDraftLine } from "react-icons/ri";
import { NotificationChoice } from "./interface";

export const NotificationChoiceData: NotificationChoice[] = [
  {
    title: "Create new notification",
    icon: <AiOutlinePlus size={30} />,
    link: "/notifications/new",
  },
  {
    title: "Saved Draft Collection",
    icon: <RiDraftLine size={30} />,
    link: "/notifications/saved-drafts",
  },
  {
    title: "View Sent Notifications",
    icon: <FaCheck size={30} />,
    link: "/notifications/sent",
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
