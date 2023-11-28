import React from "react";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie, openDeleteModal, isAuthenticated }) => {
  const navigate = useNavigate();

  const navigateToMovieDetail = () => {
    navigate(`/movie/${movie._id}`);
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent row click event
    openDeleteModal();
  };
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent row click event
    navigate(`/edit/${movie._id}`);
  };
  return (
    <tr
      className="transition-transform duration-200 cursor-pointer hover:shadow-lg"
      onClick={navigateToMovieDetail}
    >
      <td>{movie.title}</td>
      <td>{movie.description}</td>
      <td>
        <img
          src={movie.imgURL}
          alt={movie.title}
          style={{ maxWidth: "100px" }}
        />
      </td>
      <td>{movie.year}</td>
      <td>{movie.genre}</td>
      <td>{movie.director}</td>
      {isAuthenticated && (
        <td>
          <button
            className="flex items-center justify-center text-sm text-blue-500 bg-transparent border-none w-9 h-9"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="flex items-center justify-center text-sm text-red-500 bg-transparent border-none w-9 h-9 hover:bg-red-100 focus:outline-none"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default Movie;
