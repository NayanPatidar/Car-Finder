import { useState } from "react";

export default function SearchFilters({ onFilterChange, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [fuelType, setFuelType] = useState("all");
  const [seatingCapacity, setSeatingCapacity] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({
      searchTerm,
      brand,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      fuelType,
      seatingCapacity,
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  const handleReset = () => {
    setSearchTerm("");
    setBrand("all");
    setPriceRange({ min: "", max: "" });
    setFuelType("all");
    setSeatingCapacity("all");
    setSortBy("");

    onFilterChange({
      searchTerm: "",
      brand: "all",
      minPrice: "",
      maxPrice: "",
      fuelType: "all",
      seatingCapacity: "all",
    });
    onSortChange("");
  };

  return (
    <div className="mb-8 p-6 rounded-lg shadow-md transition-colors duration-300 dark:bg-gray-800 bg-white">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-6 h-6 absolute left-3 top-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Brand
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Brands</option>
              <option value="toyota">Toyota</option>
              <option value="honda">Honda</option>
              <option value="ford">Ford</option>
              <option value="bmw">BMW</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
              <option value="tesla">Tesla</option>
              <option value="hyundai">Hyundai</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Price Range
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Fuel Type
            </label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Seating Capacity
            </label>
            <select
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All</option>
              <option value="2">2 Seater</option>
              <option value="4">4 Seater</option>
              <option value="5">5 Seater</option>
              <option value="7">7 Seater</option>
              <option value="8+">8+ Seater</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="text-sm font-medium mr-2 dark:text-gray-300">
              Sort By:
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}
