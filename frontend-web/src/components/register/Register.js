import React, { Component } from 'react';

const URL_PREFIX = "";

// Separate component for register
class Register extends Component
{
   // Class object that will contain user credentials for signin and signup
   constructor(props)
   {
      super(props);
      this.state =
      {
         username: '',
         password: '',
         firstName: '',
         lastName: '',
         deadline: ''
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


   // When user registers
   handleRegister = (newMount) =>
   {
      let registerURL = URL_PREFIX;

      // Ensures that form is working properly
      const registerObject =
      {
         "username": this.state.username,
         "password": this.state.password,
         "firstName": this.state.firstName,
         "lastName": this.state.lastName,
         "deadline": this.state.deadline
      }

      // Should log all inputs
      console.log(registerObject);

      registerURL += "/register";

      fetch(registerURL,
      {
         method: "POST",
         headers:
         {
            "Content-Type": "application/json"
         },
         body:
         {
            "username": this.state.username,
            "password": this.state.password,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "deadline": this.state.deadline
         }
      })
      .then(response => response.text())
      .then(responseData => console.log(responseData))
      .catch(error => console.error("Error:", error));

      // When user successfully registers, load up home page
      this.toggleMount(newMount);
   }

   toggleMount = (newMount) =>
   {
      this.props.mount(newMount);
   }

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
                     id = "email"
                     className = "form-control"
                     type = "datetime-local"
                     onChange = {this.handleChange}
                  />

                  <br></br>

                  <button
                     className = "mb-1 btn btn-secondary col align-self-center rounded border"
                     onClick = {() => this.handleRegister("home")}
                     data-toggle = "modal"
                     data-target = "#confirmLifeModal"
                  >
                  Register
                  </button>

                  <br></br>
                  <button className = "btn col align-self-center rounded border" onClick = {() => this.toggleMount("login")}>Switch to Login</button>
               </form>
            </div>
         </div>
      );
   }
}

export default Register
