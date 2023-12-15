import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie"; // Update this path if necessary
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isAuthenticated } = useAuth();
  const fetchData = () => {
    axios
      .get("https://backend-2zc8.onrender.com/api/movies")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMovies(res.data);
        } else {
          console.error("Data received is not an array:", res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to mimic componentDidMount

  const openDeleteModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const deleteMovie = (movieId) => {
    const token = localStorage.getItem("token");

    // Configure headers with the retrieved token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("Request config:", config);
    // Implement the delete functionality here
    axios
      .delete(`https://backend-2zc8.onrender.com/api/movies/${movieId}`, config)
      .then(() => {
        closeDeleteModal();
        fetchData(); // Refresh the list after deletion
      })
      .catch((err) => console.error("Error deleting movie:", err));
  };

  const renderMovieList = () => {
    return (
      <div className="grid">
        {movies.map((movie, i) => (
          <Movie
            movie={movie}
            key={i}
            isAuthenticated={isAuthenticated}
            openDeleteModal={() => openDeleteModal(movie)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="movielist">
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Link to="/add">
          <button
            type="button"
            id="addmovie"
            className="btn btn-primary btn-lg"
          >
            Add Your Favourite Movie
          </button>
        </Link>
      </div>
      <br />

      <section className="mb-5">{renderMovieList()}</section>

      {/* Delete modal */}
      {isModalOpen && selectedMovie !== null && (
        <DeleteModal
          movie={selectedMovie}
          onClose={closeDeleteModal}
          onDelete={() => deleteMovie(selectedMovie._id)}
        />
      )}
    </div>
  );
};

export default MovieList;
