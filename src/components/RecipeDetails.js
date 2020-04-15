import React from 'react';

export default function RecipeDetails (props) {
  const recipeDetail = props.recipes.find(recipe => 
    recipe._id === props.match.params.recipeId
  )
  const proteinDetail = props.chapters.find(protein =>
    protein._id === props.match.params.id)
  if (props.currentUser === recipeDetail.submittedBy || !recipeDetail.submittedBy) {
    return (
      <div>
        <form
          onSubmit={props.handleUpdateRecipe}
          onChange={props.handleFormChange}
          id={recipeDetail._id}
          data-protein-id={recipeDetail.mainProtein}
        >
          Name: <input type="text" name="newRecipeName" defaultValue={recipeDetail.name} />
          <p></p>
          Main Protein: {proteinDetail.mainProtein}
          <p></p>
          Ingredients: <textarea name="newIngredients" rows='20' columns='100' placeholder='Enter your list of ingredients here...' defaultValue={recipeDetail.ingredients}></textarea> 
          <p></p>
          Directions: <textarea name="newDirections" rows='20' columns='100' placeholder='Enter directions here...' defaultValue={recipeDetail.directions}></textarea> 
          <p></p>
          <input type="Submit" />
          <p></p>
        </form>
        <p></p>
        <button 
          id={recipeDetail._id}
          onClick={props.handleDelete}
        >
          Delete Recipe
        </button>
        <p>
          submitted by: {recipeDetail.submittedBy}
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>
          Name: {recipeDetail.name}
        </h2>
        <h3>
          Main Protein: {proteinDetail.mainProtein}
        </h3>
        <h3>
          Ingredients: {recipeDetail.ingredients}
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