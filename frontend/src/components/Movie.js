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
    // Grid view
    <div className="border border-secondary border-2 rounded grid-item transition-transform duration-200 cursor-pointer hover:shadow-lg"
          onClick={navigateToMovieDetail}>
      <div id="movieTitle" className="mb-2">{movie.title}</div>
      <div><img
          src={movie.imgURL}
          alt={movie.title}
          style={{ height:"400px", margin: "auto"}}
        />
      </div>
    
      {isAuthenticated && (
        <div>
          <button className="btn btn-primary m-2"
            onClick={handleEditClick}>
            Edit
          </button>
          
          <button className="btn btn-danger m-2"
            onClick={handleDeleteClick}>
            Delete
          </button>
        </div>        
      )}

    </div>
    
  );
};

export default Movie;
