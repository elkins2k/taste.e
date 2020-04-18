import React from 'react';

export default function NewRecipe(props) {
  return (
    <div >
      <form
        onSubmit={props.handlePostRecipe}
        onChange={props.handleFormChange}
      >
        <input type="text" name="newRecipeName" placeholder="recipe name" />
        <p></p>
        <input type="text" name="newHeading" placeholder="table of contents heading" />
        <p></p>
        <input type="Submit" />
      </form>
    </div>
  )
}