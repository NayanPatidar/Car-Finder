// app/api/cars/route.js
import { NextResponse } from "next/server";
import { generateCars } from "@/app/lib/car-data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const brand = searchParams.get("brand");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const fuelType = searchParams.get("fuelType");
  const seatingCapacity = searchParams.get("seatingCapacity");
  const sortBy = searchParams.get("sortBy");

  const allCars = generateCars();
  console.log(allCars);
  
  let filteredCars = allCars;

  if (search) {
    const searchLower = search.toLowerCase();
    filteredCars = filteredCars.filter(
      (car) =>
        car.name.toLowerCase().includes(searchLower) ||
        car.brand.toLowerCase().includes(searchLower)
    );
  }

  if (brand && brand !== "all") {
    filteredCars = filteredCars.filter(
      (car) => car.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (minPrice) {
    filteredCars = filteredCars.filter((car) => car.price >= Number(minPrice));
  }

  if (maxPrice) {
    filteredCars = filteredCars.filter((car) => car.price <= Number(maxPrice));
  }

  if (fuelType && fuelType !== "all") {
    filteredCars = filteredCars.filter(
      (car) => car.fuelType.toLowerCase() === fuelType.toLowerCase()
    );
  }

  if (seatingCapacity && seatingCapacity !== "all") {
    filteredCars = filteredCars.filter(
      (car) => String(car.seatingCapacity) === seatingCapacity
    );
  }

  if (sortBy) {
    if (sortBy === "price_asc") {
      filteredCars.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filteredCars.sort((a, b) => b.price - a.price);
    }
  }

  const pageSize = 10;
  const pageNumber = Number(page);
  const totalPages = Math.ceil(filteredCars.length / pageSize);
  const paginatedCars = filteredCars.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(
    {
      cars: paginatedCars,
      totalPages,
      totalCars: filteredCars.length,
    },
    { status: 200 }
  );
}
