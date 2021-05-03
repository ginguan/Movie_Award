import React from 'react';
import {Button, Container, Row} from 'react-bootstrap';
import './NominatedList.css';
import './Lottie.css';
import Lottie from 'react-lottie';
import * as emptyBoxAnimation from "../images/empty_box.json";

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
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: emptyBoxAnimation.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    console.log("props.nominatedMovies",props.nominatedMovies)
    return (
        <Container>
        <Row className="d-flex p-2">
                {<span className="result-text d-flex justify-content-center">Nominated Movies</span>}
            </Row>
            <Row>
        <div className="noimated-info-container">
            {props.nominatedMovies.length ?
                <div>
                    <div><ul className="list-group  noimated-info" >
                        <div className="noimated-info">
                            {
                                props.nominatedMovies.map(nominatedMovie => (
                                    <li key={nominatedMovie.imdbID} className="list-group-item d-flex justify-content-between" >
                                        <p className="p-0 m-0"> {nominatedMovie.Title}({nominatedMovie.Year})</p>
                                        <Button className="ml-4 button-delete" variant="danger" imdbid={nominatedMovie.imdbID} onClick={handleRemoveItem} active >
                                            Remove
                                        </Button>
                                    </li>
                                ))}</div>

                    </ul>
                    </div>
                    </div>:
                <div className="text-center lottie">
                <div className="status" >
                <Lottie options={defaultOptions}  height={200} width={200}/>
                </div>
                </div>

                    }
        </div>
        </Row>
        </Container>
    );
};

export default NominatedList;
