import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Movie = (props) => (
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
    </td>
  </tr>
);

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  fetchData = () => {
    axios
      .get("http://localhost:8081/api/movies")
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({ movies: res.data });
        } else {
          console.error("Data received is not an array:", res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate() {
    this.fetchData();
  }

  MovieList() {
    return this.state.movies.map((currentMovie, i) => (
      <Movie movie={currentMovie} key={i} />
    ));
  }

  render() {
    return (
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
        <tbody>{this.MovieList()}</tbody>
      </table>
    );
  }
}
