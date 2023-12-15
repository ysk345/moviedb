import React, { useState, useEffect } from "react";

const AuthForm = ({ onClose, onRegister, onLogin, errorMessage, userData }) => {
  const [isEditing] = useState(!userData); //will edit if user is logged in
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // NEW LINE

  useEffect(() => {
    if (userData) {
      setUsername(userData.user.username);
      setEmail(userData.user.email || "");
      // Set the initial password based on whether editing or registering
      setPassword(isEditing ? userData.user.password : "");
    }
  }, [userData, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if it's register mode and include email in the credentials
    const credentials = isRegisterMode
      ? { username, email, password }
      : { username, password };

    try {
      if (isRegisterMode) {
        await onRegister(credentials);
      } else {
        await onLogin(credentials);
      }
    } catch (error) {
      // Assuming the error object has a message property
      console.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-xl md:mx-0">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
        >
          X
        </button>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mb-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Username"
              required
            />
          </div>

          {isRegisterMode && (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mb-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Email"
                required={isRegisterMode}
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mb-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="********"
                required
              />
              <button
                type="button"
                className="absolute top-0 right-0 mt-3 mr-3 text-gray-700 hover:text-gray-900"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              {isRegisterMode ? "Register" : "Login"}
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 text-sm text-center text-red-500">
              {errorMessage}
            </div>
          )}
          <div className="text-center">
            <a
              href="#"
              className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              onClick={(e) => {
                e.preventDefault();
                setIsRegisterMode(!isRegisterMode);
              }}
            >
              {isRegisterMode
                ? "Already have an account? Login here"
                : "Don't have an account? Register here"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
