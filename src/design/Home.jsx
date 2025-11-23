import React from "react";
import ItemList from "../components/ItemList";
import { useNavigate } from "react-router-dom";

const Home = ({ items, onDelete, onEdit, user, setItemToEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 md:px-10 font-inter">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 drop-shadow-sm">
          Track Prices
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          Live market prices, locations, and trends — updated instantly.
        </p>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <img
            src="/images/vegetables.jpg"
            alt="Vegetables"
            className="w-64 h-40 object-cover rounded-xl shadow-md"
          />
          <img
            src="/images/market.jpg"
            alt="Market"
            className="w-64 h-40 object-cover rounded-xl shadow-md"
          />
          <img
            src="/images/price-tag.jpg"
            alt="Price Tag"
            className="w-64 h-40 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* ADD ITEM BUTTON */}
        <div className="flex justify-end mb-4 mt-6">
          <button
            onClick={() => {
              setItemToEdit(null); // Clear any previous edit
              navigate("/Additem");
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Table */}
      <ItemList items={items} onDelete={onDelete} onEdit={onEdit} user={user} />
    </div>
  );
};

export default Home;