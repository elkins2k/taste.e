import React from 'react';
import { Link } from 'react-router-dom'

export default function Contents(props) {
  const allContents = props.contents.map ( (content,index) => {
    return(
      <h3 key={index}>
        <Link to = {`/contents/${content._id}`}>
          {content.mainProtein}
        </Link>
      </h3>
    )
  })
  return (
    <div>
        {allContents}
    </div>
  )
}