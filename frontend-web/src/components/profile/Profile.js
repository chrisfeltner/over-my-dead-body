import React, { Component } from 'react';
import EditProfile from '../modals/EditProfile.js';
import './Profile.css';
import axios from 'axios';
import authTransport from '../../utils/auth';

// Dropdown display for the user's credentials and deadlines
class Profile extends Component
{
   constructor()
   {
      super();
      this.state =
      {
         username: "",
         firstName: "",
         lastName: "",
         password: "",
         deadline: ""
      }
   }

   componentDidMount()
   {
      let getUserURL = "users/getUser";
      let userData = null;
      console.log(localStorage.getItem('token'))

      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

      axios(
      {
         method: 'GET',
         url: getUserURL,
         config: { headers: { 'Content-Type': 'application/json'}
            }
      })
      .then((response) =>
      {
         console.log("GetUser: Success");
         console.log(response.data);

         if(response.data != null)
         {
            this.setState(
               {
                  username: userData.username,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  password: userData.password,
                  deadline: userData.deadline
               });
         }
      })
      .catch((response) =>
      {

         console.log("GetUser: Unsuccessful");
         console.log(response);
      });
   }

   render()
   {
      let deadlineObject = new Date(this.state.deadline);

      let currentDeadlineDate = deadlineObject.toDateString();

      let currentDeadlineTime = deadlineObject.toLocaleTimeString("en-US");

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
               <h4 className = "dropdown-item-text">{this.state.username}</h4>

               <div className = "dropdown-divider"/>

               <div className = "d-flex">
                  <p className = "ml-4 mr-1">First Name: </p>
                  <p className = "text-secondary">{this.state.firstName}</p>
               </div>

               <div className = "d-flex">
                  <p className = "ml-4 mr-1">Last Name: </p>
                  <p className = "text-secondary">{this.state.lastName}</p>
               </div>

               <div className = "d-flex">
                  <p className = "ml-4 mr-1">Password: </p>
                  <p className = "text-secondary">{this.state.password}</p>
               </div>

               <div className = "d-flex">
                  <p className = "ml-4 mr-1">Deadline: </p>
                  <p className = "text-secondary">{currentDeadlineDate} at {currentDeadlineTime}</p>
               </div>


               <div className = "dropdown-divider"/>

               <button
                  className = "btn btn-secondary btn-sm ml-3 p-1"
                  data-toggle = "modal"
                  data-target = "#editProfileModal"
               >
               Edit Profile
               </button>
            </div>

            <EditProfile user = {this.state}/>
         </div>
      );
   }
}

export default Profile;
