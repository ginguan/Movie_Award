import React, {useEffect, useState} from 'react';
import {Alert, Col, Container, Row} from 'react-bootstrap'
import './App.css';
import Search from './components/Search';
import MovieInfo from './components/MovieInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import NominatedList from './components/NominatedList';
import ShareLink from "./components/ShareLink";
import {faSmileWink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
  const shareUrl = "https://ginguan.github.io/Movie_Award/"
  const title = 'Movie Award';

  useEffect(() => {
    setItems(null);
    setError(null);
    setIsLoaded(false);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey={YOUR_API_KEY}&plot=full`)
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
              <div>
                  {reachFive?
                      <Alert variant="danger">
                          <FontAwesomeIcon icon={faSmileWink} />
                           Sorry, Only 5 nominations can be added.
                  </Alert>:''}
              </div>
          <NominatedList nominatedMovies={nominatedMovies} setNominatedMovie={setNominatedMovie} />
          <ShareLink/>
          </Col>

        </Row>
        <Row>



        </Row>

      </Container>


    </div>
  );
}

export default App;
