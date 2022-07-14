/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SearchForm from "./SearchForm.js";
import Spinner from "./Spinner.js";
import Error from "./Error.js";
import Pagination from "./Pagination.js";
import "./index.css";

const Results = () => {
  // State for repository api data, load spinner, & error message
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({message: ""});

  // Params Hook gives access to query
  const params = useParams();

  // Activates Spinner and fetch repo data from API, dependent upon query
  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [params.query]);


  // Fetches repo search results, handles errors, and aborts spinner once complete 
  const fetchData = async () => {
    const response = await fetch("https://api.github.com/search/repositories?q=" + params.query);
    const data = await response.json();

    if (response.status >= 400 || response.ok === false) {
      const dataMsg = data.message;
      let errorMsg;
      try {
        errorMsg = data.errors[0].message;
      } catch (e) {
        errorMsg = false;
      }
      (errorMsg) ? setError({message: errorMsg}) : setError({message: dataMsg});
    } else {
      setData(data);
      setError({message: ""});
    }

    setIsLoading(false);
  };

  /* Inner Child Component displays each search result in list
     with a Link that Routes to it's Detailed View.
  */
  function SearchResults(props) {
    if (props.totalCount !== undefined) {
      return (
        <div className="search-results">
          <h3 className="results-header">Search found {props.totalCount} results</h3>
          <ul className="results-list">
            {
              data.items.map( item => {
                return (
                  <li key={item.id}>
                    <div className="result-container">
                      <div className="repo-container">
                        <div className="results-label results-repo">
                          <b>Repository:</b>
                          <Link to={`${item.id}`} state={{item_details: item}}>{item.name}</Link>
                        </div> 
                        <div className="results-label results-owner">
                          <b>Owner:</b> 
                          {item.owner.login}
                        </div>
                        <div className="results-label results-descr">
                          <b>Description:</b>
                          {item.description}
                        </div>
                      </div>
                      <img src={item.owner.avatar_url} alt="repo owner avatar" className="avatar"/>
                    </div>
                  </li>
                );
              })
            }
          </ul>
          <Pagination/>
        </div>
      );
    }
    
    return null;
  }

  /* 
    Results.js component re-renders SearchForm, Error in case, Spinner while fetching data, and
    SearchResults to display successfully fetched data from Github Search API.
  */
  return (
    <div>
      <SearchForm style_top="true" />
      {(error.message !== "") ? <Error message={error.message}/> : null}
      {(isLoading) ? <Spinner /> : null}
      {(isLoading) ? null : <SearchResults totalCount={data.total_count} query={params.query} />}
    </div>
  );
}

export default Results;