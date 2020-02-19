import React from "react";
import "./sidebar.css";

import sabrinamarkon from "../../images/sabrinamarkon.png";

const Bio = ({ author, tagline }) => {

    return (
        <div className="bio-main">
            <img src={sabrinamarkon} style={{ maxWidth: `100px` }} className="profile-img" alt="" />
            <h3 className="mt-2 author-bio">{author}</h3>
            <small className="text-muted">{tagline}</small>
        </div>
    )
}

export default Bio