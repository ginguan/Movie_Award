import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import './App.css';
import Search from './components/Search';
import MovieInfo from './components/MovieInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import NominatedList from './components/NominatedList';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [nominatedMovies, setNominatedMovie] = useState(() => {
    const storage = window.localStorage.getItem(0);
    return storage !== null
      ? JSON.parse(storage)
      : [];
  });
  const [reachFive, setReachFive] = useState(false)
  const [searchValue, setSearchValue] = useState("Blackpink");

  useEffect(() => {
    setItems(null);
    setError(null);
    setIsLoaded(false);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey={YourKey}&plot=full`)
      .then(
        res => res.json()
      .then(
        (result) => {
          if (result.Response === "True") {
            setItems(result.Search);
            setIsLoaded(true);
            console.log(result)
          }
          else {
            setIsLoaded(false);
            setError(result.Error);
          }
        }
      ))
  }, [searchValue])


  // const clickFB=()=>{
  //   FB.ui({
  //     method: 'share',
  //     href: 'https://developers.facebook.com/docs/',
  //   }, function(response){});
  // }
  useEffect(() => {
    window.localStorage.setItem(0, JSON.stringify(nominatedMovies));
    if (nominatedMovies.length === 5)
      setReachFive(true);
    else
      setReachFive(false);
  }, [nominatedMovies])

  return (

    <div className="App">
      <Container>
        <Row>
          <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
        </Row>
        <Row>
          <Col>
          <MovieInfo items={items} setItems={setItems} nominatedMovies={nominatedMovies} setNominatedMovie={setNominatedMovie} isLoaded={isLoaded} error={error} />

          </Col>
          <Col>
          <NominatedList nominatedMovies={nominatedMovies} setNominatedMovie={setNominatedMovie} />

          </Col>

        </Row>
        <Row>

        </Row>


      </Container>


    </div>
  );
}

export default App;
