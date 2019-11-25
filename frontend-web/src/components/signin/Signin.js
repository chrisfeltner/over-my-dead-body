import React, { Component } from 'react';
//import Profile from "../profile/Profile.js";
import './Signin.css';

const URL_PREFIX = "";

// Signin page that contains a login form.
class Signin extends Component
{
   // Class object that will contain user credentials for signin and signup
   constructor(props)
   {
      super(props);
      this.state =
      {
         username: null,
         password: null
      }
   }

   handleChange = (event) =>
   {
      this.setState(
      {
         [event.target.id]: event.target.value
      });
   }

   // When user logs in
   handleLogin = (newMount) =>
   {
      let loginURL = URL_PREFIX;

      // Ensures that form is working properly
      const loginObject =
      {
         'username': this.state.username,
         'password': this.state.password
      }

      // Should log all inputs
      console.log(loginObject);

      loginURL += "/login";

      fetch(loginURL,
      {
         method: "POST",
         headers:
         {
            "username": this.state.username,
            "password": this.state.password
         }
      })
      .then((response) => response.json())
      .then((responseData) =>
      {
         console.log("POST request response data", responseData);
      })
      .catch((error) =>
      {
         // If POST request fails
         console.error(error);
      });

      this.toggleMount(newMount);
   }

   // Toggles between Home, Login, and Register components
   toggleMount = (newMount) =>
   {
      this.props.mount(newMount);
   }


   // TODO: change lines 63 and 70


   render()
   {
      return(
         <div className = "card m-auto" style = {{width: "18rem"}}>
            <div className = "card-body col align-self-center">
               <h4 className = "card-title text-center">Login</h4>

               <form>
                  <h6 className = "text-center">Username</h6>
                  <input
                     id = "username"
                     className = "form-control"
                     type = "text"
                     onChange = {this.handleChange}
                  />

                  <h6 className = "text-center">Password</h6>
                  <input
                  id = "password"
                     className = "form-control"
                     type = "password"
                     onChange = {this.handleChange}
                  />

                  <br></br>

                  <button
                     className = "mb-1 btn btn-secondary col align-self-center rounded border"
                     onClick = {() => this.handleLogin("home")}
                     data-toggle = "modal"
                     data-target = "#confirmLifeModal"
                  >
                  Login
                  </button>
                  <br></br>
                  <button
                     className = "btn col align-self-center rounded border"
                     onClick = {() => this.toggleMount("register")}
                  >
                  Switch to Register
                  </button>
               </form>
            </div>
         </div>
      );
   }
}

export default Signin;
