import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Movie = ({ movie, openDeleteModal }) => {
  const navigate = useNavigate();

  const navigateToMovieDetail = () => {
    navigate(`/movie/${movie._id}`);
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
        <Link to={"/edit/" + movie._id}>Edit</Link>
        <button
          className="bg-transparent text-red-500 border-none w-9 h-9 text-sm flex items-center justify-center hover:bg-red-100 focus:outline-none"
          onClick={() => openDeleteModal(movie)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
