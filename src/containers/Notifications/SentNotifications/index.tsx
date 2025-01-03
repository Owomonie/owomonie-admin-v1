import { FiRefreshCcw } from "react-icons/fi";
import { RootState, useAppDispatch } from "../../../redux/store";
import { getSentNotifications } from "../../../redux/slice/notification";
import IndividualNotification from "../individual-notification";
import { useSelector } from "react-redux";
import { NotificationType } from "../interface";

const SentNotifications = () => {
  const dispatch = useAppDispatch();

  const sentNotificationsData = useSelector(
    (state: RootState) =>
      state.notification.sentNotifications as NotificationType[]
  );

  const sortedNotifications = [...sentNotificationsData].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[550] text-[23px] text-[#151515]">
            Sent Notifications
          </h1>
          <p className="font-[350] text-[15px] text-[#5F5F5F]">
            List of successfully sent notifications
          </p>
        </div>
        <FiRefreshCcw
          size={27}
          className="mr-10 cursor-pointer"
          onClick={() => dispatch(getSentNotifications())}
        />
      </div>
      {sortedNotifications.length > 0 ? (
        <div className="grid-cols-3 grid gap-3">
          {sortedNotifications.map((notification) => (
            <IndividualNotification
              key={notification._id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-2xl">
          No Sent Notification Availiable
        </p>
      )}
    </div>
  );
};

export default SentNotifications;
