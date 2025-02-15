import React from "react";
import { Trash2, X } from "lucide-react";

interface ConfirmDeleteProps {
  type: "entry" | "category" | null;
  name?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  type,
  name,
  onConfirm,
  onCancel,
}) => {
  if (!type) return null;

  const getTitle = () => {
    return type === "entry" ? "Delete Entry" : "Delete Category";
  };

  const getDescription = () => {
    if (type === "entry") {
      return "This entry will be permanently removed. This action cannot be undone.";
    }
    return `The category "${name}" will be permanently removed from all entries.`;
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
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <Trash2 className="text-red-500" size={32} />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {getTitle()}
          </h2>

          <p className="text-gray-600 mb-6 text-sm">{getDescription()}</p>

          <div className="flex space-x-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
