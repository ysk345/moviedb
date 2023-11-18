import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
const Movie = (props) => {
  return (
    <tr>
      <td>{props.movie.title}</td>
      <td>{props.movie.description}</td>
      <td>
        <img
          src={props.movie.imgURL}
          alt={props.movie.title}
          style={{ maxWidth: "100px" }}
        />
      </td>
      <td>{props.movie.year}</td>
      <td>{props.movie.genre}</td>
      <td>{props.movie.director}</td>
      <td>
        <Link to={"/edit/" + props.movie._id}>Edit</Link>
        <button
          className="bg-transparent text-red-500 border-none w-9 h-9 text-sm flex items-center justify-center hover:bg-red-100 focus:outline-none"
          onClick={() => props.openDeleteModal()}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchData = () => {
    axios
      .get("http://localhost:8081/api/movies")
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
    // Implement the delete functionality here
    axios
      .delete(`http://localhost:8081/api/movies/${movieId}`)
      .then(() => {
        closeDeleteModal();
        fetchData(); // Refresh the list after deletion
      })
      .catch((err) => console.error("Error deleting movie:", err));
  };

  const renderMovieList = () => {
    return movies.map((movie, i) => (
      <Movie
        movie={movie}
        key={i}
        openDeleteModal={() => openDeleteModal(movie)}
      />
    ));
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Img</th>
            <th scope="col">Year</th>
            <th scope="col">Genre</th>
            <th scope="col">Director</th>
          </tr>
        </thead>
        <tbody>{renderMovieList()}</tbody>
      </table>
      {isModalOpen && selectedMovie !== null && (
        <DeleteModal
          movie={selectedMovie}
          onClose={closeDeleteModal}
          onDelete={() => deleteMovie(selectedMovie._id)}
        />
      )}
    </>
  );
};

export default MovieList;
