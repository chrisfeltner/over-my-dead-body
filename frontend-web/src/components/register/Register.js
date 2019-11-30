import React, { Component } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Separate component for register
class Register extends Component
{
   // Class object that will contain user credentials for signin and signup
   constructor(props)
   {
      super(props);
      this.state =
      {
         username: null,
         password: null,
         firstName: null,
         lastName: null,
         deadline: null
      }
   }

   // Form manipulation
   handleChange = (event) =>
   {
      this.setState(
      {
         [event.target.id]: event.target.value
      })
   }

   handleRegister = (newMount) =>
   {
      const registerURL = "users/register";

      let newUser =
      {
         "username": this.state.username,
         "password": this.state.password,
         "firstName": this.state.firstName,
         "lastName": this.state.lastName,
         "deadline": this.state.deadline
      }

      axios(
      {
         method: 'POST',
         url: registerURL,
         data: newUser,
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then((response) =>
      {
         console.log("Registration: Successful");
         console.log(response.data);

         this.props.receiver(response.data);
         this.toggleMount(newMount);
      })
      .catch((response) =>
      {
         console.log("Registration: Unsuccessful");
         console.log(response);
      });

      // Uncomment if you want to test request
      // this.toggleMount(newMount);
   }

   toggleMount = (newMount) =>
   {
      this.props.mount(newMount);
   }

   // NOTE: Time for deadline will be in military time.

   render()
   {
      return(
         <div className = "card m-auto" style = {{width: "18rem"}}>
            <div className = "card-body">
               <h4 className = "card-title text-center">Register</h4>

               <form>
                  <h6 className = "text-center">Username</h6>
                  <input
                     id = "username"
                     className = "form-control"
                     type = "text"
                     onChange = {this.handleChange}
                  />

                  <h6 className = "text-center">First Name</h6>
                  <input
                     id = "firstName"
                     className = "form-control"
                     type = "text"
                     onChange = {this.handleChange}
                  />

                  <h6 className = "text-center">Last Name</h6>
                  <input
                     id = "lastName"
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

                  <h6 className = "text-center">Deadline</h6>
                  <input
                     id = "deadline"
                     className = "form-control"
                     type = "datetime-local"
                     onChange = {this.handleChange}
                  />

                  <br></br>

                  <button
                     type = "button"
                     className = "mb-1 btn btn-secondary col align-self-center rounded border"
                     onClick = {() => this.handleRegister("home")}
                     data-toggle = "modal"
                     data-target = "#confirmLifeModal"
                  >
                  Register
                  </button>

                  <br></br>

                  <button
                     type = "button"
                     className = "btn col align-self-center rounded border"
                     onClick = {() => this.toggleMount("login")}
                  >
                  Switch to Login
                  </button>
               </form>
            </div>
         </div>
      );
   }
}

export default Register
