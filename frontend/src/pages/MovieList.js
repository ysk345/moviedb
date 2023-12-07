import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie"; // Update this path if necessary
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../contexts/AuthContext";
import {Link} from 'react-router-dom';
import TeamLogo from "../img/group_logo.png";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { isAuthenticated } = useAuth();
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
      .delete(`http://localhost:8081/api/movies/${movieId}`, config)
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
        isAuthenticated={isAuthenticated}
        openDeleteModal={() => openDeleteModal(movie)}
      />
    ));
  };

  return (
    <>

    <h1 className="text-center">Movie Database</h1>

    {/* Button to add movie */}
      <div style={{textAlign: "center", margin: "auto"}}>
        <Link to="/add" >
        <button type="button" className="btn btn-primary">Add A Movie</button>
        </Link>
      </div>
      <br/>

    {/* Table displaying all movies */}      
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

      <footer className="text-center mx-auto">
        <p>Developed By:</p>
        <img src={TeamLogo} alt="TeamLogo" width="300" className="mx-auto" />
      </footer>
      
      
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
