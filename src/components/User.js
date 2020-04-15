import React from 'react';

export default function User(props) {
  const userDetail = props.users
    .find(user => user._id === props.match.params.id)
  return (
    <div className='userDetail'>
      <p>
        Please verify your information before proceeding
      </p>
      <h3>
        first name: {userDetail.firstName}
      <br></br>
        last name: {userDetail.lastName}
      </h3>
      <p>if necessary, change your account information here:</p>
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
          ( delete )
        </button>
      </form>
    </div>
  )
}