import React, { Component } from 'react';
import Profile from '../profile/Profile.js';
import axios from 'axios';
import setAuthToken from '../../utils/auth';

axios.defaults.withCredentials = true;

// Navigation Bar that contains Search, access to his/her account, and signout.
// This will present in the home page
class Navigation extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         searchInput: '',
         myAccount: false
      }
   }

   handleLogout(newMount)
   {
      let logoutURL = "users/logout";


      axios(
      {
         method: 'POST',
         url: logoutURL,
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then((response) =>
      {
         console.log("Logout: Success");
         console.log(response.data);
         setAuthToken(response.data);

         this.toggleMount(newMount);
      })
      .catch((response) =>
      {
         console.log("Logout: Unsuccessful");
         console.log(response);
      });

      // Uncomment if you want to test request
      this.toggleMount(newMount);
   }

   // For signout
   toggleMount = (newMount) =>
   {
      this.props.mount(newMount);
   }

   render()
   {
      return(
         <nav className = "navbar bg-secondary">
            <h4 className = "text-white">Over My Dead Body</h4>

            <form className = "form-inline my-2 my-lg-0">
               <button id = "button" href = "#" className = "text-white btn rounded border text-white mr-2">Search</button>
               <input type = "text" className = "form-control"></input>
            </form>

            <ul className = "nav">
               <li className = "nav-link">
                  <Profile />
               </li>

               <li className = "nav-link">
                  <button
                     onClick = {() => this.handleLogout("login")}
                     id = "button"
                     href = "#"
                     title = "Contact"
                     className = "text-white btn rounded border"
                  >
                  Sign Out
                  </button>
               </li>
            </ul>
         </nav>
      );
   }
}



export default Navigation;
