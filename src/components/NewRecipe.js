import React from 'react';

export default function NewRecipe(props) {
  return (
    <div >
      <form
        onSubmit={props.handleNewRecipe}
        onChange={props.handleFormChange}
      >
        <input type="text" name="newRecipeName" placeholder="recipe name" />
        <p></p>
        <input type="text" name="newMainProtein" placeholder="protein/chapter heading" />
        <p></p>
        <input type="Submit" />
      </form>
    </div>
  )
}