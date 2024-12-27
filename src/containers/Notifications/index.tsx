import NotificationChoice from "./choice";

const Notifications: React.FC = () => {
  return (
    <div className="px-6 py-4">
      <h1 className="font-[550] text-[23px] text-[#151515]">
        New Notification
      </h1>
      <p className="font-[350] text-[15px] text-[#5F5F5F]">
        Create and send notifications
      </p>

      <NotificationChoice />
    </div>
  );
};

export default Notifications;
