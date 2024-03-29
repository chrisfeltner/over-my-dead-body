import React, { Component } from 'react';
import Profile from '../profile/Profile.js';
import axios from 'axios';

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
         myAccount: false
      }
   }

   handleLogout(newMount)
   {
      let logoutURL = "users/logout";

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;

      axios(
      {
         method: 'POST',
         url: logoutURL,
         data: { 'refresh_token': "" },
         config: { headers: { 'Content-Type': 'application/json'}}
      });

      this.props.clearToken();
      this.toggleMount(newMount);
   }

   // For signout
   toggleMount = (newMount) =>
   {
      console.log("togglemount nav " + newMount)
      this.props.mount(newMount);
   }

   handleChange = (event) =>
   {
      this.props.setSearch(event.target.value);
   }

   render()
   {
      return(
         <nav className = "navbar bg-secondary">
            <h4 className = "text-white">Over My Dead Body</h4>

            <form className = "form-inline my-2 my-lg-0">
               {/* <button id = "button" href = "#" className = "text-white btn rounded border text-white mr-2">Search</button> */}
               <input type = "text" className = "form-control" value={this.props.searchTerm}
               onChange={this.handleChange} placeholder="Search"></input>
            </form>

            <ul className = "nav">
               <li className = "nav-link">
                  <Profile 
                  token={this.props.token} 
                  deadline={this.props.deadline} 
                  setDeadline={this.props.setDeadline} 
                  editSelectedDeadline={this.props.editSelectedDeadline}
                  setSelectedDeadline={this.props.setSelectedDeadline}
                  selectedDeadline={this.props.selectedDeadline}/>
               </li>

               <li className = "nav-link">
                  <button
                     onClick = {() => {this.handleLogout("login")}}
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
