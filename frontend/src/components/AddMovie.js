import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'; 

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeimgURL = this.onChangeimgURL.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      imgURL: "",
      year: "",
      genre: "",
      director: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeimgURL(e) {
    this.setState({
      imgURL: e.target.value,
    });
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }

  onChangeDirector(e) {
    this.setState({
      director: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.title);
    console.log(this.state.description);
    console.log(this.state.imgURL);
    console.log(this.state.year);
    console.log(this.state.genre);
    console.log(this.state.director);

    const newMovie = {
      title: this.state.title,
      description: this.state.description,
      imgURL: this.state.imgURL,
      year: this.state.year,
      genre: this.state.genre,
      director: this.state.director,
    };

    //connect frontend to backend
    axios
      .post("http://localhost:8081/add", newMovie)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    this.setState({
      title: "",
      description: "",
      imgURL: "",
      year: "",
      genre: "",
      director: "",
    });
  }

  render() {
    return (
      <div className="addmoviecontainer">
        <div className="col-lg-6">
          <form onSubmit={this.onSubmit}>
            <div class="form-group">
              <label for="">Title:</label>
              <input
                type="text"                
                class="form-control col-lg-4"
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </div>

            <div class="form-group">
              <label for="">Description:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div>

            <div class="form-group">
              <label for="">imgURL:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                value={this.state.imgURL}
                onChange={this.onChangeimgURL}
              />
            </div>

            <div class="form-group">
              <label for="">Year:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                value={this.state.year}
                onChange={this.onChangeYear}
              />
            </div>

            <div class="form-group">
              <label for="">Genre:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                value={this.state.genre}
                onChange={this.onChangeGenre}
              />
            </div>

            <div class="form-group">
              <label for="">Director:</label>
              <input
                type="text"
                class="form-control col-lg-4"
                value={this.state.director}
                onChange={this.onChangeDirector}
              />
            </div>

            <br />

            <button type="submit" class="btn btn-secondary">
              Submit
            </button>

            <Link to="/movielist">
            <button class="btn ms-2">Back</button>
            </Link>

          </form>
        </div>
      </div>
    );
  }
}
