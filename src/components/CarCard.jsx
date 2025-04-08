import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";

export default function CarCard({ car, onViewDetails }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(car.id);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 dark:bg-gray-800 bg-white cursor-pointer"
      onClick={() => onViewDetails(car)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="h-48 bg-gray-200 relative">
          <img
            src={
              car.image ||
              `/api/placeholder/400/300?text=${encodeURIComponent(car.name)}`
            }
            alt={car.name}
            className="w-full h-full object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          )}
        </div>
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            inWishlist
              ? "text-red-500 bg-white bg-opacity-80 hover:bg-opacity-100"
              : "text-gray-200 bg-gray-800 bg-opacity-60 hover:text-red-500"
          } transition-colors duration-300`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className="w-5 h-5"
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-white">{car.name}</h3>
          <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
            ${car.price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>{car.brand}</span>
          <span>{car.year}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-200">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{car.seatingCapacity} Seats</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{car.mileage} MPG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
