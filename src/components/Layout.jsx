'use client'
import { useTheme } from "../context/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

export default function Layout({ children }) {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <header
        className={`sticky top-0 z-10 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Car Finder</h1>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className={`py-6 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Car Finder App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
