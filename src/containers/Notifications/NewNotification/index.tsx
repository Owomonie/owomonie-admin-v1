import { useState } from "react";
import NewNotificationInputs from "./input";
import { NotificationFormState } from "../interface";
import NewNotificationCategory from "./category";

const NewNotification: React.FC = () => {
  // State for all inputs and selects
  const [formState, setFormState] = useState<NotificationFormState>({
    title: "",
    message: "",
    recipients: "",
    type: "",
  });
  const [categories, setCategories] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-[550] text-[23px] text-[#151515]">
        New Notification
      </h1>
      <p className="font-[350] text-[15px] text-[#5F5F5F]">
        Create and send notifications
      </p>
      <div className="border border-[#D3D3D3] px-5 py-8 rounded-lg shadow-lg w-full mt-6">
        <NewNotificationInputs
          formState={formState}
          handleInputChange={handleInputChange}
        />
        <NewNotificationCategory
          categories={categories}
          setCategories={setCategories}
        />
      </div>
    </div>
  );
};

export default NewNotification;
