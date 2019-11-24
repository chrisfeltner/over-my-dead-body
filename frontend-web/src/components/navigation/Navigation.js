import React, { Component } from 'react';
import Profile from '../profile/Profile.js';

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

   // For signout
   toggleMount = (newMount) =>
   {
      this.props.mount(newMount);
   }

   componentDidMount()
   {
      console.log("Navigation Mounted");
      console.log("------------------");
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
                  { <Profile /> }
               </li>

               <li className = "nav-link">
                  <button
                     onClick = {() => this.toggleMount("login")}
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
