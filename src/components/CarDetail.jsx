import { useWishlist } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import { Heart, X, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function CarDetail({ car, onClose, onRequestMore }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { darkMode } = useTheme();
  const [inWishlist, setInWishlist] = useState(isInWishlist(car.id));
  const [activeTab, setActiveTab] = useState("features");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Mock data for multiple images - in a real app, this would come from props
  const carImages = [
    car.image ||
      `/api/placeholder/800/500?text=${encodeURIComponent(car.name)}`,
    `/api/placeholder/800/500?text=Interior`,
    `/api/placeholder/800/500?text=Rear+View`,
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    setInWishlist(isInWishlist(car.id));
  }, [isInWishlist, car.id]);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % carImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + carImages.length) % carImages.length
    );
  };

  const features = [
    { name: "Brand", value: car.brand, icon: "🏢" },
    { name: "Year", value: car.year, icon: "📅" },
    { name: "Fuel Type", value: car.fuelType, icon: "⛽" },
    { name: "Transmission", value: car.transmission, icon: "⚙️" },
    {
      name: "Seating Capacity",
      value: `${car.seatingCapacity} Seats`,
      icon: "👥",
    },
    { name: "Mileage", value: `${car.mileage} MPG`, icon: "🛣️" },
    { name: "Engine", value: car.engine || "N/A", icon: "🔧" },
    { name: "Color", value: car.color || "N/A", icon: "🎨" },
  ];

  const specifications = car.specifications || [
    { name: "Horsepower", value: "180 HP", icon: "⚡" },
    { name: "Torque", value: "190 lb-ft", icon: "🔄" },
    { name: "0-60 mph", value: "8.5 sec", icon: "⏱️" },
    { name: "Top Speed", value: "130 mph", icon: "🏎️" },
    { name: "Fuel Tank", value: "14.5 gal", icon: "🛢️" },
    { name: "Ground Clearance", value: "6.2 in", icon: "📏" },
  ];

  const similarCars = [
    {
      id: 1,
      name: "Similar Model A",
      price: 32500,
      brand: car.brand,
      image: "/api/placeholder/300/200?text=Similar+A",
    },
    {
      id: 2,
      name: "Similar Model B",
      price: 30900,
      brand: car.brand,
      image: "/api/placeholder/300/200?text=Similar+B",
    },
    {
      id: 3,
      name: "Similar Model C",
      price: 34200,
      brand: "Other Brand",
      image: "/api/placeholder/300/200?text=Similar+C",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
      <div
        className={`relative max-w-5xl w-full rounded-xl shadow-2xl ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
        } max-h-[90vh] overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white transition-all z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh]">
          <div className="w-full md:w-1/2 relative">
            <div className="relative h-64 md:h-full">
              <img
                src={carImages[activeImageIndex]}
                alt={`${car.name} - View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {carImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeImageIndex
                        ? "bg-white scale-125"
                        : "bg-white bg-opacity-50 hover:bg-opacity-75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col md:max-h-[90vh] overflow-hidden">
            <div className="px-6 pt-6 pb-3 border-b dark:border-gray-800 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{car.name}</h2>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 4
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm ml-2 text-gray-500 dark:text-gray-400">
                    4.0 (24 reviews)
                  </span>
                </div>
              </div>
              <div className="text-right mr-[45px]">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ${car.price.toLocaleString()}
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Plus taxes & fees
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-b dark:border-gray-800">
              <p className="text-black dark:text-gray-500">
                {car.description ||
                  `The ${car.name} is a ${car.seatingCapacity}-seater ${car.fuelType} car from ${car.brand}, known for its exceptional reliability, performance, and comfort. Perfect for both city driving and long journeys.`}
              </p>
            </div>

            <div className="px-6 py-2 border-b dark:border-gray-800">
              <div className="flex space-x-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`py-2 px-1 font-medium border-b-2 transition-colors ${
                    activeTab === "features"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab("specifications")}
                  className={`py-2 px-1 font-medium border-b-2 transition-colors ${
                    activeTab === "specifications"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("similar")}
                  className={`py-2 px-1 font-medium border-b-2 transition-colors ${
                    activeTab === "similar"
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Similar Cars
                </button>
              </div>
            </div>


            <div className="flex-1 overflow-y-auto">
              {activeTab === "features" && (
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          darkMode ? "bg-gray-800" : "bg-gray-50"
                        }`}
                      >
                        <span className="text-xl mr-3">{feature.icon}</span>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {feature.name}
                          </div>
                          <div className="font-medium">{feature.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          darkMode ? "bg-gray-800" : "bg-gray-50"
                        }`}
                      >
                        <span className="text-xl mr-3">{spec.icon}</span>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-white">
                            {spec.name}
                          </div>
                          <div className="font-medium">{spec.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "similar" && (
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {similarCars.map((similarCar) => (
                      <div
                        key={similarCar.id}
                        className={`rounded-lg overflow-hidden border ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        } hover:shadow-md transition-shadow cursor-pointer`}
                      >
                        <div className="h-32 bg-gray-200">
                          <img
                            src={similarCar.image}
                            alt={similarCar.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium">{similarCar.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-gray-500">
                              {similarCar.brand}
                            </span>
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              ${similarCar.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t dark:border-gray-800 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 flex justify-center items-center px-4 py-2 rounded-lg ${
                  inWishlist
                    ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
                } hover:bg-opacity-90 transition-colors`}
              >
                <Heart
                  className={`w-5 h-5 mr-2 ${inWishlist ? "fill-current" : ""}`}
                  strokeWidth={1.5}
                />
                {inWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
              <button
                onClick={() => onRequestMore && onRequestMore(car)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex justify-center items-center font-medium"
              >
                Request Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
