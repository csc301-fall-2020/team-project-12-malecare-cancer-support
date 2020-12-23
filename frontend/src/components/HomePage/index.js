import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import './style.css'

class HomePage extends React.Component {


  render () {
    return (
      <div id='homeContainer'>
        <div id="imgcontainer">
        </div>
        <div id="text">
            <h1 class="title">
                &nbsp;
                CancerChat
                &nbsp;
            </h1>
        </div>
      <div class="buttons">
          <Button
              component={Link} to="/register" variant="outlined"  id="register"
              style={{maxWidth: '500px', maxHeight: '100px', minWidth: '500px', minHeight: '100px'}}>Sign Up</Button>
          <Button
              component={Link} to='/login' variant="outlined" id="login"
              style={{maxWidth: '500px', maxHeight: '100px', minWidth: '500px', minHeight: '100px'}}>Log In</Button>
      </div>
      </div>
    )
  }
}

export default HomePage
