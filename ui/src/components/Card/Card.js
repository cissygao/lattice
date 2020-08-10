import React from 'react'
import './Card.css'

export default function Card({movie}) {
  const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  const detail = `movie/${movie.id}`
  
  return (
    <div className="movie">
      <img src={poster} alt="" className="image"></img>
      <a href={detail} id={movie.id} className="title">
        <p className="title">{movie.title}</p>
      </a>
    </div>
  )
}
