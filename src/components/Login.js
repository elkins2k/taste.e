import React from 'react';

export default function Login(props) {
  return (
    <div>
      <form
        onSubmit={props.handleSubmit}
        onChange={props.handleFormChange}
      >
        <input
          type='text'
          name='currentUser'
          placeholder='your email address'
        />
        <input
          type='submit'
        />
      </form>
    </div>
  )
}