import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import Signin from './components/signin/Signin.js';
import Register from './components/register/Register.js';
import NoteNav from './components/notenav/NoteNav.js';
import * as actions from './actions/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Main JS file that will run all components of the client
class App extends Component
{
   constructor(props)
   {
      super(props);
   }

   // mount = (newMount) =>
   // {
   //    this.setState({ mount: newMount });
   // }



   render()
   {
      // We will only include component classes or function names here
      return (
         <div className = "App">
            {
               // Branches to switch between login and home page
               (this.props.mount === "home")
               ?
                     <div>
                        <Navigation {...this.props}/>
                        <NoteNav {...this.props}/>
                     </div>
               :
                  (
                     this.props.mount === "login"
                     ?
                        <Signin {...this.props}/>
                     :
                        <Register {...this.props}/>
                  )
            }
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      username: state.username,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      token: state.token,
      mount: state.mount
   }
}

const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
