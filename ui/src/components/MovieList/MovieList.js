import React from 'react'
import './MovieList.css'
import Card from '../Card/Card'

export default function MovieList({movies = []}) {
  return (
    <div className="movie-list">
      {
        movies.map((movie, key) => 
          <Card movie={movie} key={key}></Card>
        )
      }
    </div>
  );
}
