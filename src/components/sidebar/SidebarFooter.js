import React from "react";
// import { Link } from "gatsby";
// import PropTypes from "prop-types";

import "./sidebarfooter.css";

const Footer = () => {
  return (
    <div className="text-center madewithlove">
      <hr />
      <p>
        Made with{" "}
        <span className="madewithlove__heart" aria-hidden="true">
          ❤
        </span>{" "}
        by{" "}
        <a
          href="http://sabrinamarkon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info madewithlove__name"
        >
          Sabrina Markon
        </a>
      </p>
    </div>
  );
};

export default Footer;
