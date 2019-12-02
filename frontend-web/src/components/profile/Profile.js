import React, { Component } from 'react';
import EditProfile from '../modals/EditProfile.js';
import './Profile.css';
import axios from 'axios';
import moment from 'moment';

// Dropdown display for the user's credentials and deadlines
class Profile extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         username: "",
         firstName: "",
         lastName: "",
         password: "",
      }
   }

   editProfileItem = (id, value) => {
      this.setState({
         [id]: value
      })
   }

   componentDidMount()
   {
      let getUserURL = "users/getUser";

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;

      axios(
      {
         method: 'GET',
         url: getUserURL,
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then((response) =>
      {
         console.log("GetUser: Success");

         if(response !== undefined && response.data !== undefined)
         {
            this.setState(
            {
               username: response.data.username,
               firstName: response.data.firstName,
               lastName: response.data.lastName,
               password: response.data.password,
            });

            console.log(response.data);

            this.props.setDeadline(moment.utc(response.data.deadline))
         }
      })
      .catch((response) =>
      {
         console.log("GetUser: Unsuccessful");
         console.log(response);
      });

      console.log(this.state);
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
                  <p className = "ml-4 mr-1">Deadline: </p>
                  <p className = "text-secondary">{moment(this.props.deadline).format("LLLL")}</p>
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

            <EditProfile deadline={this.props.deadline} username={this.state.username}
               firstName={this.state.firstName} lastName={this.state.lastName}
               editProfileItem={this.editProfileItem}/>
         </div>
      );
   }
}

export default Profile;
