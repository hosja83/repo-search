import React from "react";
import { Routes, Route } from 'react-router-dom';
import SearchForm from './SearchForm.js';
import Results from './Results.js';
import ResultDetails from './ResultDetails.js';

function Router() {
  return ( 
    /* 
      Routes with a path, which equals the url path, and a component that should be
      rendered when we navigate to this url. 
    */
    <Routes>
      <Route path='/' element={<SearchForm />}/>
      <Route path='/repo-search/' element={<SearchForm />}/>
      <Route path='/repo-search/:query' element={<Results />}/>
      <Route path='/repo-search/:query/:id' element={<ResultDetails />}/>
    </Routes>
   );
}

export default Router;