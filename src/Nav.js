import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="top-nav">
      <Link to='/' className="navbar-brand">About</Link>
      <Link to='/' className="navbar-brand">Home</Link>
    </nav>
   );
}

export default Nav;