import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import moment from 'moment';
import { useLocation } from 'react-router-dom'
import './Movie.css'

export default function Movie() {
  const [movie, setMovie] = useState({});

  const fetchDetails = async (id) => {
    return await fetch(`http://localhost:3000/movies?id=${id}`)
      .then(response => response.json())
      .then(data => {
        const title = get(data, 'title')
        const date = moment(get(data, 'release_date')).format('DD MMM YYYY')
        const overview = get(data, 'overview')
        const poster = `https://image.tmdb.org/t/p/w500${get(data, 'poster_path')}`

        setMovie({
          poster,
          title,
          overview,
          date,
        }) 
        });}

  function useMovieView() {
    let location = useLocation()
    
    useEffect(
      () => {
        fetchDetails(location.pathname.split('/')[2])
      },
      [location]
    )
  }

  useMovieView()
  return (
    <div className="movie">
      <p className="title">{movie.title} ({movie.date})</p>
      <img src={movie.poster} alt="" className="image"></img>
      <p className="overview">{movie.overview}</p>
    </div>
  )
}
