"use client";

import React, { useState } from "react";
import { Edit3, X } from "lucide-react";

interface EditCategoryProps {
  category: string;
  onSave: (newCategory: string) => void;
  onCancel: () => void;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  category,
  onSave,
  onCancel,
}) => {
  const [editedCategory, setEditedCategory] = useState(category);

  const handleSave = () => {
    // Trim and validate the category name
    const formattedCategory = editedCategory.trim();

    if (!formattedCategory) {
      // Prevent saving empty category
      return;
    }

    onSave(formattedCategory);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <Edit3 className="text-blue-500" size={32} />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Edit Category
          </h2>

          <div className="w-full mb-6">
            <input
              type="text"
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              autoFocus
            />
          </div>

          <div className="flex space-x-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
