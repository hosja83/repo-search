/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import '@fortawesome/fontawesome-free/js/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from "./Error.js";
import Bookmark from './Bookmark.js';
import "./index.css";

function ResultDetails() {
  /* 
    State for JSON parsed repo details/object, error, contributors details, bookmark boolean flag
    and location hook for access to details of repo passed as state.
  */
  const location = useLocation();
  const [itemDetails, setItemDetails] = useState(null);
  const [error, setError] = useState({message: ""});
  const [contributors, setContributors] = useState([]);
  const [isBookmark, setIsBookmark] = useState(null);

  useEffect(() => {
    if (location.state !== null && location.state !== undefined) {
      setItemDetails(location.state.item_details);
    } else {
      // reload bookmarked page
      setIsBookmark(true);
    }
  }, []);

  // Fetches contributors through Github API call if repo details are set
  useEffect(() => {
    if (itemDetails !== null)
      fetchContributors();

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDetails]);

  // Fetches contributors from API and handles errors
  const fetchContributors = async () => {
    const response = await fetch(itemDetails.contributors_url);
    const data = await response.json();

    if (response.status >= 400 || response.ok === false) {
      setError({message: data.message});
    } else {
      setContributors(data); 
      setError({message: ""});
      setIsBookmark(false);
    }
  }

  // Inner child component that displays details of repository
  function Details() {
    return (
      <div className="details-outer-body">
        <div className="details-body">
          <div className="details-top-section">
            <h1 className="details-repo-header"><i className="fa-brands fa-github"></i>{itemDetails.name}</h1>
          </div>
          <div className="details-main-section">
            <div className="details-left-section">
              <div className="label-value-pair-container">
                <b className="details-label details-label1">Repository:</b>
                <a href={itemDetails.html_url} rel="noopener noreferrer" target="_blank" className="details-value1">{itemDetails.name}</a>
                <b className="details-label details-label2">Repo Descr:</b>
                <span className="details-value2">{itemDetails.description}</span>
                <b className="details-label details-label3">Created On:</b>
                <span className="details-value3">{(new Date([...itemDetails.created_at].slice().join(""))).toString()}</span>
              </div>
              <div className="contributors-container ">
                <div className="contributors-label details-label"><b>Contributors <span className="badge badge-contributors">{contributors.length}</span></b></div>
                <div className="contributors">
                  {(error.message !== "") ? <Error message={error.message}/> : null}
                  {
                    contributors.map( contributor => {
                      return (
                        <div key={contributor.id}>
                          <a href={contributor.html_url} rel="noopener noreferrer" target="_blank">
                            <img src={contributor.avatar_url} className="contributors-imgs" alt={"Contributor " + contributor.login + "'s " + "avatar"}/>
                          </a>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            </div>
            <div className="details-right-section">
              <div className="details-counters">
                <div className="details-label">
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-code-fork" color='#F99F38'/> Forks
                  </div>
                  <span className="badge badge-fork">{itemDetails.forks_count}</span>
                </div>
                <div className="details-label">
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-eye" color='#315399'/> Watch
                  </div>
                  <span className="badge badge-watch">{itemDetails.watchers_count}</span>
                </div>
                <div className="details-label">
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-star" color="#F7DE3A"/> Stars
                  </div>
                  <span className="badge badge-stars">{itemDetails.stargazers_count}</span> 
                </div>
              </div>
                <img src={itemDetails.owner.avatar_url} alt="Owner avatar" className="owner-avatar"/>
                <div className="owner-details">
                  <b className="details-label">Owner </b>
                  <a href={itemDetails.owner.html_url} rel="noopener noreferrer" target="_blank">{itemDetails.owner.login}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renders Details unless we received a Bookmark Route
  return (
    <>
    {
       (isBookmark !== null) ? ( (isBookmark) ? <Bookmark/> : <Details details={itemDetails}/> ) 
                             : null
    }
    </>
  );
}

export default ResultDetails;