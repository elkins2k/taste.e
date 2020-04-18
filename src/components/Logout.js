import React from 'react';

export default function Logout(props) {
  props.handleLogout()
  return (
    <div>
      Logging Out    
    </div>
  )
}