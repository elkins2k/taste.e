import React from 'react'
import { Link } from 'react-router-dom'

export default function ContentDetails(props) {
  let heading=''
  const matchingRecipes = props.recipes.map ( (recipe,index) => {
    if (recipe.heading._id && recipe.heading._id === props.match.params.id) {
      heading = recipe.heading.heading
      return (
        <div key={index}>
          <Link to={`/contents/${props.match.params.id}/${recipe._id}`}>
            {recipe.name}
          </Link>
        </div>
      )
    }
    return (
      <div key={index}></div>
    )
  })
  return (
    <div className="contents">
      <div className="TOC">
        {heading}
        {matchingRecipes}
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