import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="err-container">
        <h2 className="subtitle">
          The page you were looking for was not found!
        </h2>

        <h3 className="reg-text">Error 404</h3>
      </div>
    </>
  );
};

export default Error;
