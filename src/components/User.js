import React from 'react';

export default function User(props) {
  const userDetail = props.users
    .find(user => user._id === props.match.params.id)
  return (
    <div className='userDetail'>
      <p>
        first name: <h2>{userDetail.firstName}</h2>
      </p>
      <p>
        last name: <h2>{userDetail.lastName}</h2>
      </p>
      <p>change your account information here, if necessary:</p>
      <form className='put user name change'
        onSubmit={props.handlePutUser}
        onChange={props.handleFormChange}
        id={userDetail._id}
      >
        first name: <input
          type='text'
          name='newFirstName'
          defaultValue={userDetail.firstName}
        />
        <p></p>
        last name: <input
          type='text'
          name='newLastName'
          defaultValue={userDetail.lastName}
        />
        <p></p>
        <input
          type='submit'
        />
        {' '}
        <button className='delete user'
          id={userDetail._id}
          onClick={props.handleDelete}
        >
          Delete
        </button>
      </form>
    </div>
  )
}