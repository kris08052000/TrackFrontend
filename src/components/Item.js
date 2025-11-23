import { useState } from "react";

const Item = ({ item, onDelete, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(item.id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{item.name}</td>
      <td className="p-3">{item.price}</td>
      <td className="p-3">{item.location}</td>
      <td className="p-3">{item.date}</td>

      <td className="p-3 flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Edit
        </button>

        {showConfirm && (
            <div className="confirm-modal bg-white border p-4 rounded shadow-md">
              <p>Are you sure you want to delete this item?</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    onDelete(item.id);
                    setShowConfirm(false);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-1 bg-gray-300 text-black rounded"
                >
                  No
                </button>
              </div>
            </div>
          )}
      </td>
    </tr>
  );
};

export default Item;