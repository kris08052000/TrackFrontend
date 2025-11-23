// src/components/ItemList.jsx
import React, { useState, useMemo, useEffect } from "react";

const haversineKm = (lat1, lon1, lat2, lon2) => {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return Infinity;
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
};

const ItemList = ({ items = [], onDelete, onEdit, user }) => {
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [distanceKm, setDistanceKm] = useState(null);
  const [refLocation, setRefLocation] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const normalized = useMemo(() => items.map(it => ({
    ...it,
    _priceNumeric: Number(it.price || 0)
  })), [items]);

  const [minPrice, maxPrice] = useMemo(() => {
    if (!normalized.length) return [0, 1000000];
    const prices = normalized.map(i => i._priceNumeric);
    return [Math.min(...prices), Math.max(...prices)];
  }, [normalized]);

  useEffect(() => {
    if (normalized.length) setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const filtered = useMemo(() => {
    let data = [...normalized];
    if (search.trim()) data = data.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
    data = data.filter(i => i._priceNumeric >= priceRange[0] && i._priceNumeric <= priceRange[1]);
    if (refLocation && distanceKm != null) {
      const { lat, lng } = refLocation;
      data = data.filter(i => haversineKm(lat, lng, i.latitude, i.longitude) <= Number(distanceKm));
    }
    if (sortOption === "price-asc") data.sort((a,b) => a._priceNumeric - b._priceNumeric);
    else if (sortOption === "price-desc") data.sort((a,b) => b._priceNumeric - a._priceNumeric);
    else if (sortOption === "newest") data.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    else if (sortOption === "oldest") data.sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    return data;
  }, [normalized, search, priceRange, refLocation, distanceKm, sortOption]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const getMyLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not available.");
    navigator.geolocation.getCurrentPosition(
      pos => setRefLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }), 
      err => alert("Unable to get location: " + err.message)
    );
  };

  // Reset page if filtered items reduce
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 space-y-6">

      {/* Top Filters */}
      <div className="bg-white p-4 shadow-md rounded-xl flex flex-col md:flex-row md:items-center gap-4">

        <input
          type="text"
          placeholder="Search by name..."
          className="flex-shrink w-full md:w-64 px-4 py-2 border rounded"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />

        <div className="flex gap-2 items-center flex-1">
          <span>₹{Math.round(priceRange[0]/100)} - ₹{Math.round(priceRange[1]/100)}</span>
          <input type="range" min={minPrice} max={maxPrice} value={priceRange[0]} 
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-32"/>
          <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-32"/>
        </div>

        <select
          className="border rounded-lg p-2"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="newest">Updated: Newest</option>
          <option value="oldest">Updated: Oldest</option>
        </select>
      </div>

      {/* Distance Filter & Location */}
      <div className="bg-white p-4 shadow-md rounded-xl flex flex-col md:flex-row md:items-center gap-2">
        <input type="number" placeholder="Distance km" value={distanceKm ?? ""} 
          onChange={(e) => setDistanceKm(e.target.value === "" ? null : Number(e.target.value))}
          className="border rounded px-2 py-1 w-full md:w-32"
        />
        <button onClick={getMyLocation} className="bg-indigo-600 text-white px-4 py-2 rounded">Use My Location</button>
        <button onClick={() => { setRefLocation(null); setDistanceKm(null); }} className="bg-gray-200 px-4 py-2 rounded">Clear</button>

        {/* Items per page */}
        <select
          className="border rounded-lg p-2 ml-auto md:ml-0"
          value={perPage}
          onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Price (₹)</th>
              <th className="p-3 text-left">Updated At</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3">₹{(item._priceNumeric/100).toFixed(2)}</td>
                <td className="p-3">{new Date(item.updatedAt).toLocaleString()}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button onClick={() => { if (!user) return alert("Login required"); onEdit(item); }}
                    className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
                  <button onClick={() => { if (!user) return alert("Login required"); if (window.confirm("Delete?")) onDelete(item.id); }}
                    className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-3">
        <button onClick={() => setPage(1)} disabled={page===1} className="px-3 py-1 bg-gray-100 rounded">First</button>
        <button onClick={() => setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 py-1 bg-gray-100 rounded">Prev</button>
        <span>{page} / {totalPages}</span>
        <button onClick={() => setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-3 py-1 bg-gray-100 rounded">Next</button>
        <button onClick={() => setPage(totalPages)} disabled={page===totalPages} className="px-3 py-1 bg-gray-100 rounded">Last</button>
      </div>

    </div>
  );
};

export default ItemList;