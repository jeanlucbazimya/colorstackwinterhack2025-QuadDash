import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DriverRegistrationPage from "./pages/DriverRegistrationPage";

type PageType = "landing" | "signin" | "signup" | "driver";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("landing");

  const pages: Record<PageType, React.ReactNode> = {
    landing: <LandingPage />,
    signin: <SignInPage />,
    signup: <SignUpPage />,
    driver: <DriverRegistrationPage />,
  };

  return (
    <div>
      {/* Dev Navigation - Remove in production */}
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <button
          onClick={() => setCurrentPage("landing")}
          className={`px-3 py-1.5 text-sm rounded ${
            currentPage === "landing"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Landing
        </button>
        <button
          onClick={() => setCurrentPage("signin")}
          className={`px-3 py-1.5 text-sm rounded ${
            currentPage === "signin"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setCurrentPage("signup")}
          className={`px-3 py-1.5 text-sm rounded ${
            currentPage === "signup"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setCurrentPage("driver")}
          className={`px-3 py-1.5 text-sm rounded ${
            currentPage === "driver"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Driver Registration
        </button>
      </div>

      {pages[currentPage]}
    </div>
  );
}
