import React from "react";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie, openDeleteModal }) => {
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
      className="cursor-pointer hover:shadow-lg transition-transform duration-200"
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
      <td>
        <button
          className="bg-transparent text-blue-500 border-none w-9 h-9 text-sm flex items-center justify-center"
          onClick={handleEditClick}
        >
          Edit
        </button>
        <button
          className="bg-transparent text-red-500 border-none w-9 h-9 text-sm flex items-center justify-center hover:bg-red-100 focus:outline-none"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
