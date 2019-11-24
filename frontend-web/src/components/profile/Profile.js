import React, { Component } from 'react';
import EditProfile from '../modals/EditProfile.js';
import './Profile.css';

// Dropdown display for the user's credentials and deadlines
class Profile extends Component
{
   constructor()
   {
      super();
      this.state =
      {
         username: '',
         firstName: '',
         lastName: '',
         email: '',
         password: ''
      }
   }

   render()
   {
      return(
         <div className = "dropdown">
            <button
               id = "button"
               href = "#"
               title = "Contact"
               data-toggle="dropdown"
               className = "text-white btn dropdown-toggle rounded border"
            >
            My Profile
            </button>

            <div className = "dropdown-menu dropdown-menu-right">
               <h2 className = "dropdown-header">My Profile</h2>

               <div className = "dropdown-divider"/>

               <p className = "ml-3">Username</p>
               <p className = "ml-3">First Name</p>
               <p className = "ml-3">Last Name</p>
               <p className = "ml-3">Email</p>
               <p className = "ml-3">Password</p>

               <div className = "dropdown-divider"/>

               <button
                  className = "btn btn-secondary btn-sm ml-3 p-1"
                  data-toggle = "modal"
                  data-target = "#editProfileModal"
               >
               Edit Profile
               </button>
            </div>

            <EditProfile />
         </div>
      );
   }
}

export default Profile;
