import React from 'react';
import Ingredient from './Ingredient'
import { Link } from 'react-router-dom'

export default function RecipeDetails (props) {
  let listOfIngredients =[]
  const recipeDetail = props.recipes.find ( recipe => 
      recipe._id === props.match.params.recipeId
  )
  recipeDetail.ingredients.forEach( (ingredient,index) => {
    let ingredientItem = (
      <Ingredient
        key={index}
        ingredient={ingredient}
        recipeId={recipeDetail._id}
        deleteIngredient={props.deleteIngredient}
      />
    )
    listOfIngredients.push(ingredientItem)
  })
  if (props.currentUser === recipeDetail.submittedBy || !recipeDetail.submittedBy) {
    return (
      <div className = "recipe-details">
        <div className="recipe-left">
          <form 
            onSubmit={props.handlePutRecipe}
            onChange={props.handleFormChange}
            id={recipeDetail._id}
            data-heading-id={recipeDetail.heading._id}
          >
            ToC: 
            <Link to={`/contents/${recipeDetail.heading._id}`}>
              {recipeDetail.heading.heading}
            </Link> >
            Name: <input type="text" name="newRecipeName" defaultValue={recipeDetail.name} />          
            <p></p>
            Directions: <textarea name="newDirections" rows='20' columns='100' placeholder='Enter directions here...' defaultValue={recipeDetail.directions}></textarea> 
            <p></p>
            <input type="Submit" />
          </form>
          <button 
            id={recipeDetail._id}
            onClick={props.handleDeleteRecipe}
          >
            Delete Recipe
          </button>
          <p>
            submitted by: {recipeDetail.submittedBy}
          </p>
        </div>
        <div className="recipe-ingredients">
          <form
            onSubmit={props.handlePostIngredient}
            onChange={props.handleFormChange}
            id={recipeDetail._id}
            data-heading-id={recipeDetail.heading._id}
          >
          <input
              type="text"
              name="newIngredient"
              placeholder="new ingredient and measurement (ex: 4Cups flour)"
              value={props.newIngredient}
            /> <input type="submit" />
          </form>
          Ingredients:
            <ul>
              {listOfIngredients}
            </ul>
            <p></p>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <h2>
        ToC: 
          <Link to={`/contents/${recipeDetail.heading._id}`}>
            {recipeDetail.heading.heading}
          </Link> >
          Name: {recipeDetail.name}
        </h2>
        <h3>
          Ingredients: {listOfIngredients}
        </h3>
        <h3>
          Directions: {recipeDetail.directions}
        </h3>
        <p>
          submitted by: {recipeDetail.submittedBy}
        </p>
      </div>
    )
  }
}