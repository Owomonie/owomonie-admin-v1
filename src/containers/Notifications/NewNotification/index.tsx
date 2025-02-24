import { useState } from "react";
import NewNotificationInputs from "./input";
import { NotificationFormState } from "../interface";
import NewNotificationCategory from "./category";
import { useAppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../../redux/slice/notification";
import { toast } from "react-toastify";

const NewNotification: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // State for all inputs and selects
  const [formState, setFormState] = useState<NotificationFormState>({
    title: "",
    message: "",
    recipients: "",
    type: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [userSelectedID, setUserSelectedID] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveNotification = async (status: number) => {
    if (
      !formState.title ||
      !formState.message ||
      !formState.recipients ||
      !formState.type ||
      (formState.recipients === "one" && !userSelectedID)
    ) {
      toast.error("All fields with (*) are required!");
      return;
    }
    await dispatch(
      sendNotification({
        body: formState.message,
        title: formState.title,
        recipient:
          formState.recipients === "one"
            ? userSelectedID
            : formState.recipients,
        type: formState.type,
        categories,
        extra: {
          navigate,
        },
        status,
      })
    );
  };

  return (
    <div className="px-6 py-4">
      <h1 className="font-[550] text-[23px] text-[#151515]">
        New Notification
      </h1>
      <p className="font-[350] text-[15px] text-[#5F5F5F]">
        Create and send notifications
      </p>
      <div className="border border-[#D3D3D3] p-8 rounded-lg shadow-lg w-full mt-6">
        <NewNotificationInputs
          formState={formState}
          handleInputChange={handleInputChange}
          userSelectedID={userSelectedID}
          setUserSelectedID={setUserSelectedID}
        />
        <NewNotificationCategory
          categories={categories}
          setCategories={setCategories}
        />
        <div className="flex gap-4 justify-end py-5">
          <button
            className="border-[2px] px-10 py-2 rounded-3xl border-[#1F79B0] font-[550] text-[15px] text-[#1F79B0]"
            onClick={() => handleSaveNotification(0)}>
            Save as Draft
          </button>
          <button
            className="bg-[#1F79B0] px-10 py-2 rounded-3xl  font-[550] text-[15px] text-[#FCFCFC]"
            onClick={() => handleSaveNotification(1)}>
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNotification;
