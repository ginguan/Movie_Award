import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css';

function Search(props){
    const onChangeSearch = (event) => {
        props.setSearchValue(event.target.value);
        console.log(event.target.value)
    }
    return (
        <div class="search-container mb-3">
           <h3 class = "search-results">Search Movie Titles</h3>
           <div class = "label-input ">

            <label for="inputType "><FontAwesomeIcon size = '2x' icon={faSearch} /></label>
            <input className="search-results form-control" id="searchInput" rows="2" placeholder="Enter Movie Title" value={props.searchValue} onChange={event => onChangeSearch(event)}></input>
 
           </div>
            
            
        </div>

    )
   
}


export default Search;