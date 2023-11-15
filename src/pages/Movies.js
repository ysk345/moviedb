import "../index.css";
import Movie from "../components/Movie";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import EditMovie from "../components/EditMovie";

function Movies() {
  const [movies, setMovies] = useState([
    {
      name: "The Lord of the Rings: The Return of the King",
      year: "2003",
      img: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      name: "Inception",
      year: "2010",
      img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    },
    {
      name: "The Matrix",
      year: "1999",
      img: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    },
    {
      name: "Interstellar",
      year: "2014",
      img: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    },
    {
      name: "Back to the Future",
      year: "1985",
      img: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    },
    {
      name: "The Lunchbox",
      year: "2013",
      img: "https://m.media-amazon.com/images/M/MV5BMTUwMzc1NjIzMV5BMl5BanBnXkFtZTgwODUyMTIxMTE@._V1_FMjpg_UX1000_.jpg",
    },
    {
      name: "Children of Heaven",
      year: "1993",
      img: "https://m.media-amazon.com/images/M/MV5BZTYwZWQ4ZTQtZWU0MS00N2YwLWEzMDItZWFkZWY0MWVjODVhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    },
    {
      name: "Fly Away Home",
      year: "1996",
      img: "https://m.media-amazon.com/images/M/MV5BYjQyMzFhYTItODYxYy00MDNmLTgyOGEtNGRmZTg5YzhlNjEyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg",
    },
    {
      name: "Parasite",
      year: "2019",
      img: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    },
    {
      name: "Shoplifters",
      year: "2018",
      img: "https://m.media-amazon.com/images/M/MV5BMmQ1NGVjYjQtYjZmMi00ZDAyLWI1M2ItNjFiN2Q5NTQwMmVlXkEyXkFqcGdeQXVyMTYzMDM0NTU@._V1_.jpg",
    },
  ]);

  return (
    <div>
        

        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => {              
            return (
              <Movie
              key={uuidv4()}
              name={movie.name}
              year={movie.year}
              img={movie.img} />
            );
          })}
          ;
        </div>
      
    </div>
  );
}

export default Movies;
