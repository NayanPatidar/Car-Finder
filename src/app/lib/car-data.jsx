export function generateCars() {
  const brands = [
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes",
    "Audi",
    "Tesla",
    "Hyundai",
  ];
  const models = {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "i4"],
    Mercedes: ["C-Class", "E-Class", "GLC", "S-Class", "EQS"],
    Audi: ["A4", "Q5", "A6", "Q7", "e-tron"],
    Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
    Hyundai: ["Elantra", "Tucson", "Santa Fe", "Palisade", "Ioniq"],
  };
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["Automatic", "Manual", "CVT", "DCT"];
  const colors = ["Black", "White", "Silver", "Blue", "Red", "Gray", "Green"];

  const cars = [];

  // Generate 80 cars
  for (let i = 1; i <= 80; i++) {
    const brandIndex = Math.floor(Math.random() * brands.length);
    const brand = brands[brandIndex];
    const modelIndex = Math.floor(Math.random() * models[brand].length);
    const model = models[brand][modelIndex];
    const fuelTypeIndex = Math.floor(Math.random() * fuelTypes.length);
    const fuelType = fuelTypes[fuelTypeIndex];

    let basePrice;
    if (["BMW", "Mercedes", "Audi", "Tesla"].includes(brand)) {
      basePrice = 40000 + Math.floor(Math.random() * 40000);
    } else {
      basePrice = 20000 + Math.floor(Math.random() * 20000);
    }

    let priceAdjustment = 0;
    if (fuelType === "Electric") {
      priceAdjustment = 10000;
    } else if (fuelType === "Hybrid") {
      priceAdjustment = 5000;
    }

    const price = basePrice + priceAdjustment;

    let seatingCapacity;
    if (model.includes("Truck") || model === "Cybertruck") {
      seatingCapacity = 5;
    } else if (
      model.includes("SUV") ||
      model === "X5" ||
      model === "Q7" ||
      model === "Explorer" ||
      model === "Palisade"
    ) {
      seatingCapacity = 7;
    } else if (model === "Odyssey") {
      seatingCapacity = 8;
    } else if (model === "Mustang" || model === "i4") {
      seatingCapacity = 4;
    } else {
      seatingCapacity = 5;
    }

    let transmission;
    if (fuelType === "Electric") {
      transmission = "Automatic";
    } else {
      const transIndex = Math.floor(Math.random() * transmissions.length);
      transmission = transmissions[transIndex];
    }

    let mileage;
    if (fuelType === "Electric") {
      mileage = 100 + Math.floor(Math.random() * 150); // MPGe
    } else if (fuelType === "Hybrid") {
      mileage = 40 + Math.floor(Math.random() * 20);
    } else if (fuelType === "Diesel") {
      mileage = 30 + Math.floor(Math.random() * 15);
    } else {
      mileage = 25 + Math.floor(Math.random() * 15);
    }

    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];

    // Assign image (1.jpg to 19.jpg, then loop back)
    const imageNumber = ((i - 1) % 19) + 1; // Cycles through 1 to 19
    const image = `${imageNumber}.jpg`;

    cars.push({
      id: i,
      name: `${brand} ${model}`,
      brand,
      price,
      year: 2020 + Math.floor(Math.random() * 5),
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      color,
      engine:
        fuelType === "Electric"
          ? "Electric Motor"
          : `${1.5 + Math.floor(Math.random() * 4) / 2}L ${fuelType}`,
      image,
    });
  }

  return cars;
}
