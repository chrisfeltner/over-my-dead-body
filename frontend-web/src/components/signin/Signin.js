import React, { Component } from 'react';
import axios from 'axios';
//import Profile from "../profile/Profile.js";
import './Signin.css';

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

   handleLogin = (event) =>
   {
      event.preventDefault();

      const loginURL = "users/login";

      // Ensures that form is working properly
      const loginObject =
      {
         'username': this.state.username,
         'password': this.state.password
      }

      axios(
      {
         method: 'POST',
         url: loginURL,
         data: loginObject,
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then((response) =>
      {
         console.log("Login: Success");
         console.log(response.data);

         this.props.receiver(response.data.token);
         this.toggleMount("home");
      })
      .catch((response) =>
      {
         console.log("Login: Unsuccessful");
         console.log(response);
      });

      // Uncomment if you want to test request
      //this.toggleMount(newMount);
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

               <form onSubmit = {this.handleLogin}>

                  <h6 className = "text-center">Username</h6>
                  <input
                     id = "username"
                     className = "form-control"
                     type = "text"
                     onChange = {this.handleChange}
                     required
                  />



                  <h6 className = "text-center">Password</h6>
                  <input
                     id = "password"
                     className = "form-control"
                     type = "password"
                     onChange = {this.handleChange}
                     required
                  />

                  <br></br>

                  <button
                     type = "submit"
                     className = "mb-1 btn btn-secondary col align-self-center rounded border"
                     data-toggle = "modal"
                     data-target = "#confirmLifeModal"
                  >
                  Login
                  </button>

                  <br></br>

                  <button
                     type = "button"
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
