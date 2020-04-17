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
        |  last name: <input
          type='text'
          name='newLastName'
          defaultValue={userDetail.lastName}
        />
        <h4>user search preferences</h4>
        {/* <div className="preferences">
          <div className="preferences-1">
            <p>low carb: <input
              type='checkbox'
              name='newCarbs'
              value='true'
              defaultValue={userDetail.avoidCarbs}
            /></p>
            <p>gluten free: <input
              type='checkbox'
              name='newGluten'
              value='true'
              defaultValue={userDetail.avoidGluten}
            /></p>
            <p>nut allergy: <input
              type='checkbox'
              name='newNuts'
              value='true'
              defaultValue={userDetail.avoidNuts}
            /></p>
            <p>avoid quinoa: <input
              type='checkbox'
              name='newQuinoa'
              value='true'
              defaultValue={userDetail.avoidQuinoa}
            /></p>
            <p>avoid spicy foods (we love it, but it doesn't love us): <input
              type='checkbox'
              name='newSpicy'
              value='true'
              defaultValue={userDetail.avoidSpicy}
            /></p>
          </div>
          <div className="preferences-2">
            <p><input
              type='checkbox'
              name='newDairy'
              value='true'
              defaultValue={userDetail.avoidDairy}
              /> : lactose intolerance, ovo vegetarian (no dairy), or vegan </p>
            <p><input
              type='checkbox'
              name='newEggs'
              value='true'
              defaultValue={userDetail.avoidEggs}
              /> : egg allergy, lacto vegetarian (no eggs), or vegan: </p>
            <p><input
              type='checkbox'
              name='newMeat'
              value='true'
              defaultValue={userDetail.avoidMeat}
              /> : lacto-ovo vegetarian (no meat), or vegan: </p>
            <p><input
              type='checkbox'
              name='newQuinoa'
              value='true'
              defaultValue={userDetail.avoidShellfish}
              /> : shellfish allergy, lacto-ovo vegetarian (no meat), or vegan</p>
          </div>
        </div> */}
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