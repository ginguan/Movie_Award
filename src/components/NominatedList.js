import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { motion } from "framer-motion";
import './NominatedList.css';
function NominatedList(props) {

    const animationedCallback = (imdbID) => {
        props.setNominatedMovie(props.nominatedMovies.filter(item => item.imdbID !== imdbID))
    }
    const handleRemoveItem = (e) => {
        var target = e.target;
        var parent = target.parentElement;
        parent.classList.remove("new-item");
        const imdbID = target.getAttribute("imdbid");
        parent.addEventListener("animationend", animationedCallback(imdbID), false);
        // parent.classList.add("removed-item");
    }
    return (
        <Container>
        <Row  className="d-flex p-2">
                {<span className="result-text d-flex justify-content-center">Nominated Movies</span>}
            </Row>
            <Row>
        <div className="noimated-info-container">
            {props.nominatedMovies ?
                <ul className="list-group  noimated-info" >

                    <div className="noimated-info">                    
                        {
                        props.nominatedMovies.map(nominatedMovie => (

                        <li  key={nominatedMovie.imdbID} className="list-group-item d-flex justify-content-between" >
                            <p className="p-0 m-0"> {nominatedMovie.Title}({nominatedMovie.Year})</p>
                            <Button className="ml-4 button-delete" variant="danger" imdbid={nominatedMovie.imdbID} onClick={handleRemoveItem} active >
                                Remove
                                </Button>
                        </li>
                    ))}</div>

                </ul>: <p>Waiting for nomination...</p>
                    }
        </div>
        </Row>
        </Container>
    );
};

export default NominatedList;