import React from "react";
import '@fortawesome/fontawesome-free/js/all';
import "./index.css";

function Footer() {
  return ( 
    <footer>
      <span>Copyright &copy;</span>
      <span>{`${new Date().getFullYear()}`}</span>
      <a href="https://github.com/hosja83" rel="noopener noreferrer" target="_blank">Alhosainy Altaher</a>
      <a href="https://github.com/hosja83" rel="noopener noreferrer" target="_blank">
        <i className="fa-brands fa-github"></i>
      </a>
    </footer>
   );
}

export default Footer;