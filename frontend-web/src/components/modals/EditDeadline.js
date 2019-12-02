import React, { Component } from 'react';
import moment from 'moment';

// Form to edit profile
class EditDeadline extends Component
{
   constructor(props)
   {
      super(props);
   }

   handleChange = (event) =>
   {
      this.props.editSelectedDeadline(event.target.value);
   }

   // componentDidMount() {
   //    this.props.setSelectedDeadline()
   // }

   render()
   {
      return(
         <div id = "editDeadlineModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header">
                     <h5 className = "modal-title">Edit Deadline</h5>

                     <button type = "button" className = "close" data-dismiss = "modal" aria-label = "Close">
                        <span aria-hidden = "true">&times;</span>
                     </button>
                  </div>

                  <div className = "modal-body">
                     <input
                        id = "deadline"
                        className = "form-control"
                        type = "datetime-local"
                        value = {moment(this.props.deadline).format("YYYY-MM-DD[T]HH:mm")}
                        onChange = {this.handleChange}
                     />
                  </div>

                  <div className = "modal-footer">
                     <button type = "button" className = "btn btn-outline-danger" data-dismiss = "modal">Cancel</button>
                     <button
                        type = "button"
                        className = "btn btn-success"
                        data-dismiss = "modal"
                        onClick = {this.props.editDeadline}
                     >
                     Change
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default EditDeadline;
