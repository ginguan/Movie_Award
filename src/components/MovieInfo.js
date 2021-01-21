import React from 'react';
import { Button, Image, Row, Col, Spinner, Container } from 'react-bootstrap';
import { Popup } from 'semantic-ui-react';
import { motion } from "framer-motion";
import './MovieInfo.css';

const MovieInfo = (props) =>{
    //defuault
    const isNominated = (movie)=>{
    let nominated = false;
    if(props.nominatedMovies.length ===5){
        //window.alert("sometext");
        return true;
    }
    props.nominatedMovies.forEach(nominatedMovie => {
        if (nominatedMovie.imdbID === movie.imdbID) {
          nominated = true;
        }
      })
      return nominated;
}
const movieList = (
    props.items ?
    <div> 
        <Popup style={popup_style}
        position='left center' 
        trigger = {<ul className="list-group movie-info">
        {props.items.map(moive => (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}  key={moive.imdbID} className="list-group-item ">
            <Row>
              <Col>
                <Image alt="poster" src={moive.Poster} alt="poster" />
              </Col>
              <Col className="">
                <p> {moive.Title}</p>
                <p className="mt-4">({moive.Year})</p>
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
        </ul>}>

      </Popup>
      </div>
      : ' ')
      
      return (
        <div className="">
          <Container >
            <Row  className="d-flex p-2">
                {<span className="result-text d-flex justify-content-center">Search Results</span>}
            </Row>
            <Row className="d-flex p-2">
              {!props.isLoaded && props.error !== null && <p className="no-info">Sorry, No Movies Available</p>}
              { props.error === null && !props.isLoaded &&
                <Spinner className="loader" animation="border" variant="warning" ></Spinner>}
              {props.isLoaded && movieList}
            </Row>
          </Container>
    </div>
    
      );
    }

export default MovieInfo;