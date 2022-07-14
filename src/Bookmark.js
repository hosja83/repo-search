/* eslint-disable no-useless-concat */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Error from "./Error";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import '@fortawesome/fontawesome-free/js/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Bookmark() {
  const params = useParams();
  const [itemsError, setItemsError] = useState({message: ""});
  const [itemsAreLoading, setItemsAreLoading] = useState(true);
  const [item, setItem] = useState(null);

  const [contributors, setContributors] = useState([]);
  const [contributorsError, setContributorsError] = useState([]);
  const [isContributorsLoading, setIsContributorsLoading] = useState(false);

  useEffect(() => {
    fetchItems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch result item details and reload
  const fetchItems = async () => {
    const query = params.query;
    const id = params.id;

    const response = await fetch("https://api.github.com/search/repositories?q=" + query);
    const data = await response.json();
    if (response.status >= 400 || response.ok === false) {
      setItemsError({message: data.message});
      const dataMsg = data.message;
      let errorMsg;
      try {
        errorMsg = data.errors[0].message;
      } catch (e) {
        errorMsg = false;
      }
      (itemsError) ? setItemsError({message: errorMsg}) : setItemsError({message: dataMsg});
    } else {
      //traverse through list and find element that matches with id
      
      const itemMatch = data.items.find( item => {
        
        if (item.id == id) return id;
      });
      setItem(itemMatch);
      setItemsError({message: ""});
    }
    setItemsAreLoading(false);
  }

  useEffect(() => {
    if (item !== null) {
      setIsContributorsLoading(true);
      fetchContributors();
    }
  }, [item]);

  const fetchContributors = async () => {
    const response = await fetch(item.contributors_url);
    const data = await response.json();

    if (response.status >= 400 || response.ok === false) {
      setContributorsError({message: data.message});
    } else {
      setContributors(data); 
      setContributorsError({message: ""});
    }
    setIsContributorsLoading(false);
  }

  return ( 
    <>
    <Nav/>
    {(itemsError.message !== "") ? <Error message={itemsError.message}/> : null}
    {(itemsAreLoading) ? <Spinner /> : null}

    {
      (!itemsAreLoading) ?
      <div className="details-outer-body">
        <div className="details-body">
          <div className="details-top-section">
            <h1 className="details-repo-header"><i className="fa-brands fa-github"></i>{item.name}</h1>
          </div>
          <div className="details-main-section">
            <div className="details-left-section">
              <div className="label-value-pair-container">
                <b className="details-label details-label1">Repository:</b>
                <a href={item.html_url} rel="noopener noreferrer" target="_blank" className="details-value1">{item.name}</a>
                <b className="details-label details-label2">Repo Descr:</b>
                <span className="details-value2">{item.description}</span>
                <b className="details-label details-label3">Created On:</b>
                <span className="details-value3">{(new Date([...item.created_at].slice().join(""))).toString()}</span>
              </div>
              <div className="contributors-container ">
                <div className="contributors-label details-label"><b>Contributors <span className="badge badge-contributors">{contributors.length}</span></b></div>
                <div className="contributors">
                  {(contributorsError.message !== "") ? <Error message={contributorsError.message}/> : null}
                  {(isContributorsLoading) ? <Spinner /> : null}
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
                  <span className="badge badge-fork">{item.forks_count}</span>
                </div>
                <div className="details-label">
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-eye" color='#315399'/> Watch
                  </div>
                  <span className="badge badge-watch">{item.watchers_count}</span>
                </div>
                <div className="details-label">
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-star" color="#F7DE3A"/> Stars
                  </div>
                  <span className="badge badge-stars">{item.stargazers_count}</span> 
                </div>
              </div>
                <img src={item.owner.avatar_url} alt="Owner avatar" className="owner-avatar"/>
                <div className="owner-details">
                  <b className="details-label">Owner </b>
                  <a href={item.owner.html_url} rel="noopener noreferrer" target="_blank">{item.owner.login}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      : null
    }
    <Footer/>
    </>
  );
}

export default Bookmark;