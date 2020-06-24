import React from "react"

import "./header.css"

const MobileBio = (props) => {
    const author = props.author;
    return (
        <div className="mobile-bio-main">
            <h2 className="my-2">{author}</h2>
        </div>
    )
}

export default MobileBio