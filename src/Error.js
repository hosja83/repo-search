import React from "react";

function Error(props) {
  return ( 
    <div className="error-container">
      <p className="error-msg">
        <strong>Error:</strong> 
        <span>{props.message}</span>
      </p>
    </div>
  );
}

export default Error;