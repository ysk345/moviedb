import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DiscussionBoard from "../components/DiscussionBoard";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { isAuthenticated } = useAuth(); // Use the useAuth hook to get the authentication status

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <p>{movie.year}</p>
      <p>{movie.director}</p>
      <p>{movie.genre}</p>
      <img
        src={movie.imgURL}
        alt={movie.title}
        className="w-full max-w-md my-4"
      />
      <p>{movie.description}</p>
      

      <DiscussionBoard isAuthenticated={isAuthenticated} movieId={id} />
    </div>
  );
};

export default MovieDetail;