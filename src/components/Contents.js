import React from 'react';
import { Link } from 'react-router-dom'

export default function Contents(props) {
  const allContents = props.contents.map ( (content,index) => {
    return(
      
        <h3 key={index}>
          <Link to = {`/contents/${content._id}`}>
            {content.heading}
          </Link>
        </h3>
     
    )
  })
  return (
    <div className="contents">
      <div className="TOC">
        <h2>
          Table of Contents:
        </h2>
        {allContents}
      </div>
      <div className="TOC-nav">
        {/* <h3>
          Search
        </h3> */}
        <Link to = "/recipe/new">
          <h3>
            Add Recipe
          </h3>
        </Link>
      </div>
    </div>
  )
}