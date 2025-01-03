import { useState } from "react";
import { useSelector } from "react-redux";
import { NotificationType } from "./interface";
import { format } from "date-fns";
import { RootState, useAppDispatch } from "../../redux/store";
import { Users } from "../../utils/types";
import { AvatarList } from "../../utils/avatars";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { sendDraftNotification } from "../../redux/slice/notification";

const IndividualNotification = ({
  notification,
}: {
  notification: NotificationType;
}) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const users = useSelector(
    (state: RootState) => state.allUsers.data as Users[]
  );

  const singleRecipient = users.find(
    (user) => user.id === notification.recipient
  );

  const avatarIndex =
    singleRecipient && !isNaN(parseInt(singleRecipient.avatar))
      ? parseInt(singleRecipient.avatar)
      : undefined;

  const avatarSource =
    avatarIndex !== undefined ? AvatarList[avatarIndex] : null;

  const handleSendClick = () => {
    setShowModal(true);
  };

  const handleConfirmSend = async (notification: NotificationType) => {
    setShowModal(false);
    await dispatch(
      sendDraftNotification({
        notificationId: notification._id,
      })
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formattedDate = format(
    new Date(notification.createdAt),
    "MMM/dd/yyyy, h:mm a"
  );

  return (
    <div className="relative border shadow-lg border-[#D3D3D3] rounded-lg p-4">
      <div className="border-b pb-2 text-[#151515] text-[15px] font-[550]">
        <div className="flex justify-between gap-2">
          <h2 className="truncate overflow-hidden text-ellipsis">
            {notification.title}
          </h2>
          {!singleRecipient ? (
            <p className="text-sm text-[#b8b7b7] font-bold">
              {notification.recipient}
            </p>
          ) : (
            <p className="text-sm text-[#b8b7b7] font-bold">One</p>
          )}
        </div>
        <p className="text-[11px] font-[450] text-[#c0d343]">
          {notification.type === 0
            ? "Push Notification"
            : notification.type === 1
            ? "Email"
            : "Push Notification and Email"}
        </p>
      </div>
      <div className="flex justify-between items-start py-2">
        <div className="flex flex-wrap w-[50%] gap-1">
          {notification.categories.length > 0 &&
            notification.categories.map((cat) => (
              <div
                key={cat}
                className="text-[11px] font-[350] text-[#7A808D] bg-[#DEEEFD] px-1 py-[2px] rounded-3xl flex items-center">
                #{cat}
              </div>
            ))}
        </div>
        <div className="flex items-center">
          {notification.recipient === "all" ||
          notification.recipient === "users" ? (
            <div className="flex items-center">
              <div className="flex">
                {users.slice(0, 3).map((user) => {
                  const userAvatarIndex = !isNaN(parseInt(user.avatar))
                    ? parseInt(user.avatar)
                    : undefined;
                  const userAvatarSource =
                    userAvatarIndex !== undefined
                      ? AvatarList[userAvatarIndex]
                      : null;

                  return (
                    userAvatarSource && (
                      <img
                        key={user.id}
                        src={userAvatarSource}
                        alt={user.userName}
                        className="w-5 h-5 bg-[#1F79B0] rounded-full"
                        title={user.userName}
                      />
                    )
                  );
                })}
              </div>
              <span className="text-xs text-[#898989] font-[350] ml-[2px]">
                {notification.totalReceivers} recipients
              </span>
            </div>
          ) : (
            singleRecipient && (
              <div className="flex items-center gap-[2px]">
                {avatarSource && (
                  <img
                    src={avatarSource}
                    alt="avatar"
                    className="w-5 h-5 bg-[#1F79B0] rounded-full"
                  />
                )}
                <span className="text-xs text-[#898989] font-[350] truncate overflow-hidden text-ellipsis">
                  {singleRecipient.userName}
                </span>
              </div>
            )
          )}
        </div>
      </div>
      <p className="font-[350] text-[15px] mt-2 mb-8">{notification.body}</p>
      {notification.status === 1 ? (
        <FaEnvelopeCircleCheck
          size={25}
          className="absolute bottom-3 right-3 text-[#898989]"
        />
      ) : (
        <FiSend
          size={25}
          className="absolute bottom-3 right-4 bg-[#1F79B0] text-white p-[5px] rounded-full cursor-pointer"
          onClick={handleSendClick}
        />
      )}
      <p className="text-[10px] absolute bottom-3 left-4 text-[#898989]">
        {formattedDate}
      </p>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Send</h2>
            <p className="text-sm mb-6">
              Are you sure you want to send the message with title{" "}
              <strong>"{notification.title}"</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#1F79B0] text-white rounded hover:bg-[#17699f]"
                onClick={() => handleConfirmSend(notification)}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualNotification;
