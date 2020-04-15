import React from 'react';
import GoogleLogin from 'react-google-login';

const GoogleClientId = '341072380497-1uq27kjbd4joe4750lu9uqogh18ocu71.apps.googleusercontent.com'

const responseGoogle = (response) => {
  console.log(response);
}
 
export default function Login(props) {
  return (
    <div className="home">
      <div className="welcome">
        <h1>
          Welcome!
        </h1>
        <p>
          Much like your grandmother's box of index cards she kept in her kitchen filled with recipes that have been handed down through the generations or passed around at church potlucks, this site is intended as a virtual recipe sharing forum.
        </p>
        <p>
          Looking for a recipe with specific ingredients? Just want to browse through a specific category to find a new recipe to try? Help yourself. However, the real fun begins when you create an account and start sharing grandma's favorite dish that was always a hit at family gatherings.
        </p>
        <p>
          Simply enter your email on the right and you can start sharing your own favorite recipes or comment on other recipes in our database!
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
          ...or...
        </p>
        <GoogleLogin
          clientId={GoogleClientId}
          buttonText="login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}