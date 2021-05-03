import React from 'react';
import {Button, Col, Container, Image, Row, Spinner} from 'react-bootstrap';
import {Popup} from 'semantic-ui-react';
import {motion} from "framer-motion";
import './MovieInfo.css';
import './Lottie.css';
import Lottie from 'react-lottie';
import * as emptySearchAnimation from "../images/empty_search.json";

const MovieInfo = (props) =>{
    const isNominated = (movie)=>{
    let nominated = false;
    if(props.nominatedMovies.length ===5){
        return true;
    }
    props.nominatedMovies.forEach(nominatedMovie => {
        if (nominatedMovie.imdbID === movie.imdbID) {
          nominated = true;
        }

      })
      return nominated;
}
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: emptySearchAnimation.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const movieList = (
        props.items ?
        <div>
           <ul className="list-group movie-info">
            {props.items.map(moive => (
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  key={moive.imdbID} className="list-group-item ">
                <Row>
                  <Col>
                  <Popup trigger=
                    {<Image alt="poster" src={moive.Poster} alt="poster" />}
                    position = "left top">
                  <Popup.Header>{moive.Production}
                  </Popup.Header>
                    <Popup.Content>
                    {moive.Rated}
                    </Popup.Content>
                    </Popup>

                  </Col>
                  <Col className="">
                    <p> {moive.Title}</p>
                    <p> {moive.Year}</p>

                    <Button
                      className="btn btn-warning"
                      value = "Nominate"
                      disabled={isNominated(moive)} onClick={() => {
                          props.setNominatedMovie([...props.nominatedMovies, moive]);
                          }} active>
                              Nominate
                    </Button>
                  </Col>
                </Row>
              </motion.button>
            ))}
          </ul>
          </div>
          : ' ')


      return (
        <div className="">
          <Container >
            <Row  className="d-flex p-2">
                {<span className="result-text d-flex justify-content-center">Search Results</span>}
            </Row>
            <Row className="d-flex p-2">
              {!props.isLoaded && props.error !== null &&
              <div className="text-center lottie">
                  <div className="status" >
                      <Lottie options={defaultOptions}  height={200} width={200}/>
                  </div>
              </div>}
              { props.error === null && !props.isLoaded &&
                <Spinner className="loader" animation="border" variant="warning" ></Spinner>}
              {props.isLoaded && movieList}
            </Row>
          </Container>
    </div>

      );
    }

export default MovieInfo;
