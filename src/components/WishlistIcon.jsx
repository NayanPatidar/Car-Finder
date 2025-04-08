"use client";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

export default function WishlistIcon() {
  const { wishlist } = useWishlist();
  const [showWishlist, setShowWishlist] = useState(false);

  return (
    <div className="relative ">
      <button
        onClick={() => setShowWishlist(!showWishlist)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Wishlist"
      >
        <svg
          className="w-6 h-6"
          fill="none"
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
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>

      {showWishlist && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 border-2 border-white">
          <div className="p-3 border-b dark:border-gray-700">
            <h3 className="font-medium text-white">
              My Wishlist ({wishlist.length})
            </h3>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {wishlist.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Your wishlist is empty
              </div>
            ) : (
              wishlist.map((car) => (
                <div
                  key={car.id}
                  className="p-3 border-b dark:border-gray-700 flex items-center"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden mr-3">
                    <img
                      src={
                        car.image || `/api/placeholder/40/40?text=${car.brand}`
                      }
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white">
                      {car.name}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      ${car.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {wishlist.length > 0 && (
            <div className="p-3">
              <button
                onClick={() => setShowWishlist(false)}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
