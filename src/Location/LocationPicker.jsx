import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LocationPicker = ({ onLocationSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [77.5946, 12.9716], // Bangalore default
      zoom: 3,
    });

    map.current.on("click", async (e) => {
      const lat = e.lngLat.lat;
      const lng = e.lngLat.lng;

      if (!marker.current) {
        marker.current = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map.current);
      } else {
        marker.current.setLngLat([lng, lat]);
      }

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      const locationName = data.display_name || "";

      onLocationSelect({ lat, lng, locationName });
    });
  }, []);

  const handleSearch = async (e) => {
    if (e.key !== "Enter") return;

    const query = e.target.value;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await res.json();

    if (data[0]) {
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      const locationName = data[0].display_name;

      map.current.flyTo({ center: [lon, lat], zoom: 15 });

      if (!marker.current) {
        marker.current = new maplibregl.Marker().setLngLat([lon, lat]).addTo(map.current);
      } else {
        marker.current.setLngLat([lon, lat]);
      }

      onLocationSelect({ lat, lng: lon, locationName });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        placeholder="Search place..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(e);
          }
        }}
        className="w-full max-w-md px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div
        ref={mapContainer}
        className="w-full h-[70vh] rounded-lg border border-gray-300"
      />
    </div>
  );
};

export default LocationPicker;