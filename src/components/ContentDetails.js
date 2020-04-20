import React from 'react'
import { Link } from 'react-router-dom'

export default function ContentDetails (props) {
  const selectedHeading = props.contents.find ( content => {
    return content._id === props.match.params.id
  }) 
  const matchingRecipes = props.recipes.map ( (recipe,index) => {
    if (recipe.heading._id === selectedHeading._id) {
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
        <form className='content-heading-form'
          onSubmit={props.handlePutContent}
          onChange={props.handleFormChange}
          id={selectedHeading._id}
        >
          Heading: <input
            type='text'
            name='newHeading'
            defaultValue={selectedHeading.heading}
          />
          <input
            type='submit'
            value='submit'
          />
        </form>
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