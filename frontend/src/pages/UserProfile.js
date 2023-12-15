// src/pages/UserProfile.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import { API_BASE_URL } from "../constants"; // Assuming constant.js is in the same directory
import EditProfileForm from "../components/EditProfileForm"; //NEW LINE

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedUserData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }

    setIsEditing(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={handleEditClick} id="editProfileButton">
        Change Password
      </button>
      <br></br>
      {isEditing && (
        <EditProfileForm
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
          userData={userData}
        />
      )}
      {!isEditing && userData ? (
        <div className="fields-container">
          <div className="field">
            <label>Username:</label>
            <div>{userData?.user?.username}</div>
          </div>
          <div className="field">
            <label>Email:</label>
            <div>{userData?.user?.email}</div>
          </div>
          <div className="field">
            <label>Password:</label>
            <div>********</div>
          </div>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
