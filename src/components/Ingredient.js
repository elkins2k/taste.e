import React from 'react';

export default function Ingredient(props){
  return (
    <li>
      {props.ingredient.ingredient}{" "}
      <button
        id={props.userId}
        data-ingredient-id={props.ingredient._id}
        onClick={props.deleteIngredient}
        recipe-id={props.recipeId}
      >
        ( delete )
      </button>
    </li>
  )
}
