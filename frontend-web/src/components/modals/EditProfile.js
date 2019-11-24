import React, { Component } from 'react';

// Form to edit profile
class EditProfile extends Component
{
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
                           className = "form-control"
                           type = "text"
                           onChange = {event => this.setState({username: event.target.value})}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">First Name</h6>
                        <input
                           className = "form-control"
                           type = "text"
                           onChange = {event => this.setState({firstName: event.target.value})}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">Last Name</h6>
                        <input
                           className = "form-control"
                           type = "text"
                           onChange = {event => this.setState({lastName: event.target.value})}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">Email</h6>
                        <input
                           className = "form-control"
                           type = "text"
                           onChange = {event => this.setState({email: event.target.value})}
                        />
                     </div>

                     <div className = "form-group">
                        <h6 className = "text-center">Password</h6>
                        <input
                           className = "form-control"
                           type = "password"
                           onChange = {event => this.setState({password: event.target.value})}
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
