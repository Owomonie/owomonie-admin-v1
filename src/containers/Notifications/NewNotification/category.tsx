import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface NewNotificationCategoryProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewNotificationCategory = ({
  categories,
  setCategories,
}: NewNotificationCategoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories((prev) => prev.filter((item) => item !== category));
  };

  return (
    <div>
      <div className="flex flex-col gap-1 relative border-b border-[#EAEAEA] pb-5">
        <label
          htmlFor="category"
          className="font-[350] text-xs text-[#5F5F5F]">
          CATEGORY
        </label>
        <div className="flex gap-2 flex-wrap">
          {categories.length > 0 ? (
            categories.map((item) => (
              <div
                key={item}
                className="text-xs font-[450] text-[#7A808D] bg-[#DEEEFD] py-2 px-3 rounded-3xl flex items-center gap-2 my-2">
                #{item}{" "}
                <MdOutlineCancel
                  className="cursor-pointer text-red-500"
                  onClick={() => handleRemoveCategory(item)}
                />
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500"></p>
          )}
        </div>
        <div
          className="flex items-center gap-1 border w-fit p-2 border-[#1F79B0] rounded-3xl text-[#1F79B0] cursor-pointer"
          onClick={() => setIsModalOpen(true)}>
          <FaPlus size={10} />
          <p className="text-[10px] font-[450]">ADD CATEGORY</p>
        </div>
      </div>

      {/* Modal for adding categories */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              Add Notification Category
            </h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewNotificationCategory;
