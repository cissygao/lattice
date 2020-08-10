import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import MovieList from './components/MovieList/MovieList'
import Movie from './components/Movie/Movie'
import SearchBar from './components/SearchBar/SearchBar';
import { Pagination } from '@material-ui/lab';

const API_BASEURL = "http://localhost:3000"

function Home() {
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);
  const [movieList, setMovieList] = useState();

  const fetchData = async () => {
    return await fetch(API_BASEURL + '/movies')
      .then(response => response.json())
      .then(data => {
        setCount(data.total_pages)
        setMovieList(data.results) 
       });}

  const updateInput = async (input) => {
     return await fetch(API_BASEURL + `/movies?keyword=${input}`)
     .then(response => response.json())
     .then(data => {
        setInput(input);
        setCount(data.total_pages)
        setMovieList(data.results) 
      });}
      
  const updatePage = async (e, page) => {
    return await fetch(API_BASEURL + `/movies?keyword=${input}&page=${page}`)
    .then(response => response.json())
    .then(data => {
        setInput(input);
        setCount(data.total_pages)
        setMovieList(data.results) 
      });}

  useEffect( () => {fetchData()},[]);
	
  return (
    <div className='App'>
      <h1>Movie List</h1>
      <SearchBar 
        keyword={input} 
        setKeyword={updateInput}
      />
      <Pagination
        count={count}
        onChange={(e, page) => updatePage(e, page)}
      />
      <MovieList
        movies={movieList}
      />
    </div>
   );
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/movie" >
            <Movie />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
