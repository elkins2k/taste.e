import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleLoginClientId = process.env.GOOGLE_LOGIN_CLIENT_ID

export default function Login(props) {
  return (
    <div className="home">
      <div className="welcome">
        <h1>
          Welcome!
        </h1>
        <p>
          Much like your grandmother's kitchen box of index cards filled with recipes that have been handed down through the generations and/or passed around at church potlucks, this site is a virtual version of that box!
        </p>
        <p>
          Just want to browse through a specific category to find a new recipe to try? Help yourself. Just click on "Table of Contents" above.
        </p>
        <p>
          However, if you login, you can start sharing your own favorite recipes or comment on other recipes in our database!
        </p>
        <h2>
          Happy cooking!!
        </h2>
      </div>
      <div className="login">
        <h2>
          Login here:
        </h2>
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
        <p>
          ...or login with...
        </p>
        <GoogleLogin
          clientId={GoogleLoginClientId}
          buttonText="Google"
          onSuccess={props.responseGoogle}
          onFailure={props.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}