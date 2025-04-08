"use client";

import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import CarDetail from "./CarDetail";
import Pagination from "./Pagination";
import useCars from "../hooks/useCars";
import SearchFilters from "./SearchFilters";
import {
  Filter,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import WishlistIcon from "./WishlistIcon";

export default function CarList() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    brand: "all",
    minPrice: "",
    maxPrice: "",
    fuelType: "all",
    seatingCapacity: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [quickFilterActive, setQuickFilterActive] = useState(null);

  const { cars, loading, error, totalPages, totalResults } = useCars({
    filters,
    searchTerm: filters.searchTerm,
    page: currentPage,
    sortBy,
  });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setQuickFilterActive(null);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
  };

  const handleRequestTestDrive = (car) => {
    alert(
      `Test drive requested for ${car.name}. Our team will contact you shortly.`
    );
  };

  const applyQuickFilter = (filter) => {
    if (quickFilterActive === filter) {
      setQuickFilterActive(null);
      setFilters({
        ...filters,
        fuelType: "all",
      });
    } else {
      setQuickFilterActive(filter);
      setFilters({
        ...filters,
        fuelType: filter,
      });
    }
    setCurrentPage(1);
  };

  const quickFilters = [
    { id: "electric", label: "Electric", icon: "⚡" },
    { id: "hybrid", label: "Hybrid", icon: "🔋" },
    { id: "petrol", label: "Petrol", icon: "⛽" },
    { id: "diesel", label: "Diesel", icon: "🛢️" },
  ];

  if (error) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="rounded-full bg-red-100 dark:bg-red-900 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <X className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
          Error loading cars
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold  dark:text-gray-500">
              Find Your Perfect Car
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Browse our selection of quality vehicles for every need
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="sm:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>

          <div className="hidden sm:flex space-x-4 items-center">
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 shadow-sm text-white"
                    : "text-gray-500 dark:text-gray-500"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                List
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="form-select text-sm bg-transparent border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white p-3"
              >
                <option value="">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="year_desc">Newest First</option>
                <option value="year_asc">Oldest First</option>
              </select>
            </div>

            <WishlistIcon />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => applyQuickFilter(filter.id)}
              className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  quickFilterActive === filter.id
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              <span className="mr-1">{filter.icon}</span>
              <span>{filter.label}</span>
              {quickFilterActive === filter.id && (
                <X className="ml-1 h-3 w-3" />
              )}
            </button>
          ))}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="hidden sm:flex items-center px-3 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            <span>{showFilters ? "Hide Filters" : "All Filters"}</span>
          </button>
        </div>

        {showFilters && (
          <div className="transition-all duration-300">
            <SearchFilters
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              initialFilters={filters}
            />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">
              Loading vehicles...
            </p>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-2 text-xl font-medium dark:text-white">
              No cars found
            </h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={handleFilterChange.bind(null, {
                searchTerm: "",
                brand: "all",
                minPrice: "",
                maxPrice: "",
                fuelType: "all",
                seatingCapacity: "all",
              })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <span className="dark:text-white">
                  <span className="font-semibold">
                    {totalResults || cars.length}
                  </span>{" "}
                  cars found
                </span>
                {Object.values(filters).some(
                  (val) => val !== "" && val !== "all"
                ) && (
                  <button
                    onClick={handleFilterChange.bind(null, {
                      searchTerm: "",
                      brand: "all",
                      minPrice: "",
                      maxPrice: "",
                      fuelType: "all",
                      seatingCapacity: "all",
                    })}
                    className="ml-4 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear filters
                  </button>
                )}
              </div>

              <div className="sm:hidden flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="text-sm bg-transparent dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="year_desc">Newest First</option>
                  <option value="year_asc">Oldest First</option>
                </select>
              </div>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col space-y-4"
              }
            >
              {cars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onViewDetails={handleViewDetails}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {currentPage === 1 && cars.length >= 3 && (
              <div className="mt-12 mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-8 text-white">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-5 w-5 mr-2" />
                      <span className="text-sm font-semibold uppercase tracking-wider">
                        Featured Vehicle
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{cars[0].name}</h3>
                    <p className="mb-6 opacity-90">
                      Experience luxury and performance in this exceptional
                      vehicle. Perfect for those who demand the very best in
                      automotive engineering.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-sm opacity-75">Price</span>
                        <span className="font-bold text-xl">
                          ${cars[0].price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm opacity-75">Type</span>
                        <span className="font-semibold">
                          {cars[0].fuelType || "Hybrid"}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(cars[0])}
                      className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="md:w-1/2 h-64 md:h-auto bg-gray-200">
                    <img
                      src={
                        cars[0].image ||
                        `/api/placeholder/600/400?text=${encodeURIComponent(
                          cars[0].name
                        )}`
                      }
                      alt={cars[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={handleCloseDetails}
          onRequestMore={handleRequestTestDrive}
        />
      )}
    </div>
  );
}
