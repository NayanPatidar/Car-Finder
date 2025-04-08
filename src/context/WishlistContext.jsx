'use client'
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  const addToWishlist = (car) => {
    const updatedWishlist = [...wishlist, car];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (carId) => {
    const updatedWishlist = wishlist.filter((car) => car.id !== carId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (carId) => {
    return wishlist.some((car) => car.id === carId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
