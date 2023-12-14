// Nav bar component based on tailwind CSS
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthForm from "./AuthForm";
import axios from "axios";
import { LOGIN_API, REGISTER_API } from "../constants";
import { useAuth } from "../contexts/AuthContext";

//routes for nav bar
const navigation = [
  //{ name: "Home", href: "/" },
  { name: "Movies", href: "/movielist" },
  { name: "Discussion", href: "/discussion" },
  //{ name: "Add", href: "/add" },
];

export default function Header(props) {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const { isAuthenticated, login, logout } = useAuth();
  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post(LOGIN_API, {
        username: credentials.username,
        password: credentials.password,
      });
      // If the login is successful, the backend should return a JWT token
      const token = response.data.token;
      login(token);
      // Close the login form modal
      setIsLoginFormOpen(false);

      // Add any other logic you need after successful login
      console.log("Logged in successfully", response.data);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setAuthError(message);
      // Handle errors, such as showing an error message to the user
      console.error("Login failed:", error.response || error.message);
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const response = await axios.post(REGISTER_API, {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });

      // The backend might return a token directly or you might have to log in after registration
      // If a token is returned, store it, otherwise prompt for login
      console.log("Registration successful", response.data);
      // Close the registration form modal
      setIsLoginFormOpen(false);
      // Add any other logic you need after successful registration
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setAuthError(message);
      // Handle errors, such as showing an error message to the user
      console.error("Registration failed:", error.response || error.message);
    }
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="header">
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">                  
                    <div className="flex space-x-4">
                      <p className="sitename h4 text-white mt-2">Reel.ly</p>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) => {
                            return (
                              "text-slate-700 rounded-md px-3 py-2 no-underline" +
                              (isActive
                                ? "bg-gray-900 text-white no-underline"
                                : "text-slate-700 hover:bg-gray-700 hover:text-white no-underline")
                            );
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  
                  {!isAuthenticated ? (
                    <button
                      onClick={() => setIsLoginFormOpen(true)}
                      className="relative p-1 text-gray-200 bg-gray-800 rounded-md hover:text-white focus:outline-none"
                    >
                      Sign In / Register
                    </button>
                  ) : (
                    <button
                      className="relative p-1 text-gray-200 bg-gray-800 rounded-md hover:text-white focus:outline-none"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return (
                        "block rounded-md px-3 py-2 text-base font-medium no-underline" +
                        (isActive
                          ? "bg-gray-900 text-white no-underline"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white no-underline")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-gray-300">
        <div className="min-h-screen px-2 py-2 mx-auto max-w-7xl">
          {props.children}
        </div>
      </div>
      {isLoginFormOpen && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            aria-hidden="true"
          ></div>

          {/* AuthForm positioned as a Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <AuthForm
              onClose={() => setIsLoginFormOpen(false)}
              onLogin={handleLogin}
              onRegister={handleRegister}
              errorMessage={authError}
            />
          </div>
        </>
      )}
    </div>
  );
}