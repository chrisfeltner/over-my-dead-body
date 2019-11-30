import React, { Component } from 'react';

// Form to edit profile
class EditProfile extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         username: props.user.username,
         firstName: props.user.firstName,
         lastName: props.user.lastName,
         password: props.user.password,
         deadline: props.user.deadline
      }
   }

   handleChange = (event) =>
   {
      this.setState(
      {
         [event.target.id]: event.target.value
      });

      console.log(this.state);
   }

   render()
   {
      return(
         <div id = "editProfileModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header">
                     <h5 className = "modal-title">Edit Profile</h5>

                     <button type = "button" className = "close" data-dismiss = "modal" aria-label = "Close">
                        <span aria-hidden = "true">&times;</span>
                     </button>
                  </div>

                  <div className = "modal-body">
                     <div className = "form-group">
                        <h6 className = "text-center">Username</h6>
                        <input
                           id = "username"
                           className = "form-control"
                           type = "text"
                           onChange = {this.handleChange}
                           value = {this.state.username}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">First Name</h6>
                        <input
                           id = "firstName"
                           className = "form-control"
                           type = "text"
                           onChange = {this.handleChange}
                           value = {this.state.firstName}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">Last Name</h6>
                        <input
                           id = "lastName"
                           className = "form-control"
                           type = "text"
                           onChange = {this.handleChange}
                           value = {this.state.lastName}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">Password</h6>
                        <input
                           id = "password"
                           className = "form-control"
                           type = "password"
                           onChange = {this.handleChange}
                           value = {this.state.password}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">Deadline</h6>
                        <input
                           id = "deadline"
                           className = "form-control"
                           type = "datetime-local"
                           onChange = {this.handleChange}
                           value = {this.state.deadline}
                        />
                     </div>
                  </div>

                  <div className = "modal-footer">
                     <button type = "button" className = "btn btn-outline-danger" data-dismiss = "modal">Cancel</button>
                     <button type = "button" className = "btn btn-success" data-dismiss = "modal">Save</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default EditProfile;
