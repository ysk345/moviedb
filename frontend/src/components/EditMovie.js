import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EditMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgURL: "",
    year: "",
    genre: "",
    director: "",
  });

  const params = useParams();

  useEffect(() => {
    fetch("https://backend-s1zg.onrender.com/api/movies/" + params.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      });
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `https://backend-s1zg.onrender.com/api/movies/${params.id}`,
        formData,
        config
      ) // Use movieId for the PUT request
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setFormData({
      title: "",
      description: "",
      imgURL: "",
      year: "",
      genre: "",
      director: "",
    });
  };

  return (
    <div className="container">
      <div className="col-lg-6">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <label>description:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <label>imgURL:</label>
            <input
              type="text"
              className="form-control"
              name="imgURL"
              value={formData.imgURL}
              onChange={handleChange}
            />
            <label>year:</label>
            <input
              type="text"
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />
            <label>genre:</label>
            <input
              type="text"
              className="form-control"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
            <label>director:</label>
            <input
              type="text"
              className="form-control"
              name="director"
              value={formData.director}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>

          <Link to="/movielist">
            <button class="btn btn-secondary ms-2 mt-2">Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
