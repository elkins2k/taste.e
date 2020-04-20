import React from 'react';

export default function Ingredient(props){
  if (props.currentUser === props.submittedBy || !props.submittedBy) {
    return (
      <li>
        {props.ingredient.ingredient}{" "}
        <button
          id={props.userId}
          data-ingredient-id={props.ingredient._id}
          onClick={props.handleDeleteIngredient}
          recipe-id={props.recipeId}
        >
          delete
        </button>
      </li>
    )
  } else {
    return (
      <li>
        {props.ingredient.ingredient}{" "}
      </li>
    )
  }
}