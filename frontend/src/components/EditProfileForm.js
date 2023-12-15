import React, { useState, useEffect } from "react";
const EditProfileForm = ({ onClose, onSave, userData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // NEW LINE
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userData && userData.user) {
      setUsername(userData.user.username || "");
      setEmail(userData.user.email || "");
      setPassword(""); // You can set an initial value for password if needed
    }
  }, [userData]);

  const handleSave = async () => {
    onSave({ username, email, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      username,
      email,
      password,
    };

    try {
      await onSave(updatedUserData);
      onClose();
    } catch (error) {
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
          {/* ... other fields ... */}

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
              type="button"
              onClick={handleSave}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              id="editProfileButton" // Assigning the ID here
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
