import React, {useEffect, useState} from 'react';
import {Alert, Col, Container, Row} from 'react-bootstrap'
import './App.css';
import Search from './components/Search';
import MovieInfo from './components/MovieInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import NominatedList from './components/NominatedList';
import {Popup} from 'semantic-ui-react';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
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
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey={Your_Key}&plot=full`)
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
            <div style = {{marginTop:15, fontWeight: "bold"}}> Share:
              <Popup content='Share via Twitter' basic position='bottom center'
                     trigger={
                       <TwitterShareButton className="share-btn" url={shareUrl} title = {title}>
                         <TwitterIcon size={32} round={true} />
                       </TwitterShareButton>
                     } />
              <Popup content='Share via Facebook' basic position='bottom center'
                     trigger={
                       <FacebookShareButton className="share-btn" url={shareUrl}  title = {title}>
                         <FacebookIcon size={32} round={true} />
                       </FacebookShareButton>
                     } />
              <Popup content='Share via Linkedin' basic position='bottom center'
                     trigger={
                       <LinkedinShareButton className="share-btn" url={shareUrl}  title = {title}>
                         <LinkedinIcon size={32} round={true} />
                       </LinkedinShareButton>
                     } />
            </div>
          </Col>

        </Row>
        <Row>



        </Row>

      </Container>


    </div>
  );
}

export default App;
