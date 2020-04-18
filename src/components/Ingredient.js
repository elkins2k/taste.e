import React from 'react';

export default function Ingredient(props){
  return (
    <li>
      {props.ingredient.description}{" "}
      <button
        id={props.userId}
        data-ingredient-id={props.ingredient._id}
        onClick={props.deleteIngredient}
      >
        ( delete )
      </button>
    </li>
  )
}
