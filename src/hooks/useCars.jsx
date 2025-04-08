import { useState, useEffect } from "react";

export default function useCars({ filters, searchTerm, page, sortBy }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page);

        if (searchTerm) {
          queryParams.append("search", searchTerm);
        }

        if (filters.brand && filters.brand !== "all") {
          queryParams.append("brand", filters.brand);
        }

        if (filters.minPrice) {
          queryParams.append("minPrice", filters.minPrice);
        }

        if (filters.maxPrice) {
          queryParams.append("maxPrice", filters.maxPrice);
        }

        if (filters.fuelType && filters.fuelType !== "all") {
          queryParams.append("fuelType", filters.fuelType);
        }

        if (filters.seatingCapacity && filters.seatingCapacity !== "all") {
          queryParams.append("seatingCapacity", filters.seatingCapacity);
        }

        if (sortBy) {
          queryParams.append("sortBy", sortBy);
        }

        const response = await fetch(`/api/cars?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCars(data.cars);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, searchTerm, page, sortBy]);

  return { cars, loading, error, totalPages };
}
