import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LocationPicker from "../Location/LocationPicker";

const Additem = ({ onAdd, itemToEdit, clearEdit }) => {
  const [form, setForm] = useState({ name: "", location: "", price: "", lat: null, lng: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (itemToEdit) setForm({ 
      name: itemToEdit.name, 
      location: itemToEdit.location, 
      price: itemToEdit.price / 100, 
      lat: itemToEdit.latitude, 
      lng: itemToEdit.longitude 
    });
    else setForm({ name: "", location: "", price: "", lat: null, lng: null });
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, price, lat, lng } = form;
    if (!name || !location || !price || !lat || !lng) return alert("Fill all fields & select location.");
    onAdd({ ...form, price: Number(price) * 100, latitude: lat, longitude: lng, id: itemToEdit?.id });
    setForm({ name: "", location: "", price: "", lat: null, lng: null });
    clearEdit?.();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6 rounded-2xl shadow-xl bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 flex flex-col gap-4">
      <h2 className="text-white text-2xl font-bold text-center">{itemToEdit ? "Edit Item" : "Add New Item"}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <LocationPicker onLocationSelect={({ lat, lng, locationName }) => setForm(f => ({ ...f, lat, lng, location: locationName }))} />
        <input placeholder="Item Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="p-3 rounded bg-white/80 border" />
        <input placeholder="Location" value={form.location} readOnly className="p-3 rounded bg-gray-100 border" />
        <input placeholder="Price" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="p-3 rounded bg-white/80 border" />

        <button type="submit" className="py-3 rounded bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white font-bold">
          {itemToEdit ? "Update Item" : "Submit Item"}
        </button>

        <button type="button" onClick={() => { clearEdit?.(); navigate("/"); }} className="py-3 rounded bg-gray-600 text-white font-bold">
          Back
        </button>
      </form>
    </div>
  );
};

export default Additem;