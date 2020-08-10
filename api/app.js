const express = require("express");
const app = express();
const axios = require('axios');
const cors = require('cors');

const API_KEY = "650f9cc770b0b11d664184a74faa6b5f"
const API_BASEURL = "https://api.themoviedb.org/3"

app.use(cors())

app.get("/movies", (req, res, next) => {
  const { id, keyword } = req.query
  const page = req.query.page || 1

  let url  = API_BASEURL
  if (id) {
    url += `/movie/${id}?`
  } else if (keyword) {
    url += `/search/movie?query=${keyword}&page=${page}&`
  } else {
    url += `/movie/popular?page=${page}&`
  }
  url += `api_key=${API_KEY}`

  axios.get(url).then(response => {
    res.json(response.data)
  });
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
