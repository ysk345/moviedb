// MovieDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

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
      <img
        src={movie.imgURL}
        alt={movie.title}
        className="w-full max-w-md my-4"
      />
      <p>{movie.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default MovieDetail;
