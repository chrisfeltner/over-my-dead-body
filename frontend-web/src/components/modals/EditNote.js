import React, { Component } from 'react';

// Form to edit an existing new note.
class EditNote extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         id: props.id
      }
   }

   handleChange = (event) =>
   {
      console.log(this.state.id);
   }

   render()
   {
      return(
         <div id = "editNoteModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header">
                     <h5 className = "modal-title">Edit Note</h5>

                     <button type = "button" className = "close" data-dismiss = "modal" aria-label = "Close">
                        <span aria-hidden = "true">&times;</span>
                     </button>
                  </div>

                  <div className = "modal-body">
                     <div className = "form-group">
                        <label>To</label>
                        <input type = "email" className = "form-control" onChange = {this.handleChange}/>
                     </div>

                     <div className = "form-group">
                        <label>Subject</label>
                        <input type = "text" className = "form-control" onChange = {this.handleChange}/>
                     </div>

                     <div className = "form-group">
                        <textarea className = "form-control" rows = "8" onChange = {this.handleChange}/>
                     </div>
                  </div>

                  <div className = "modal-footer">
                     <button type = "button" className = "btn btn-outline-danger" data-dismiss = "modal">Cancel</button>
                     <button type = "button" className = "btn btn-success" data-dismiss = "modal">Save Note</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default EditNote;
