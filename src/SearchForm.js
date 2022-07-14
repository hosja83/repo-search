import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = (props) => {
  // State for query, queryValidation boolen flag, and navigate hook
  const [query, setQuery] = useState("");
  const [isValidQuery, setIsValidQuery] = useState(true);
  const navigate = useNavigate();

  /*
   Check whether query has url special characters /, \, %, or,
   starts with ampersand & which gives out validation error from API
  */
  const validateQuery = (q) => {
    const regex = /^&|\\|%|\//;
    (regex.test(q)) ? setIsValidQuery(false) : setIsValidQuery(true);
  }

  // Update onChange, validate, and set query
  const handleInput = (event) => {
    const newQuery = event.target.value.trim();
    setQuery(newQuery);
    validateQuery(newQuery);
  };

  // Navigate to search/query Route/url if valid
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (isValidQuery) 
      navigate(`/search/${query}`);
  };

  // Dynamic styling for hiding/showing Error and search form header in results view
  const [formErrorStyle, setFormErrorStyle] = useState('search-error-inactive');
  useEffect(() => {
    (isValidQuery) ? setFormErrorStyle('search-error-inactive') : setFormErrorStyle('search-error-active')
  }, [isValidQuery]);

  const [formHeaderStyle, setFormHeaderStyle] = useState(null);
  useEffect(() => {
    setFormHeaderStyle((props.style_top) ? {position: "static", marginTop: "85px" } : {position: "absolute", marginTop: "0" });
  }, [props]);

  // Displays Search Form input, button, search icon, and github Search header
  return (
    <div className="form-header-container" style={formHeaderStyle}>
      <h1 className="top-header">GitHub Search</h1>
      <div className="search">
        <form onSubmit={handleSubmit} className="search-form">
          <div>
            
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="search-icon">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
            <input type="text" className="form-control" placeholder="Search" onChange={handleInput}/>
          </div>
          <div className={formErrorStyle}>
            * Special characters /, \, and % are not allowed. Search cannot start with & ampersand.
          </div>
          <button type="submit" className="btn btn-default" id="submit-btn">Github Search</button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;