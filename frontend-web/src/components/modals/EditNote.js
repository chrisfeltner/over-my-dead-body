import React, { Component } from 'react';

// Form to edit an existing new note.
class EditNote extends Component
{
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
                        <input type = "email" className = "form-control"/>
                     </div>

                     <div className = "form-group">
                        <label>Subject</label>
                        <input type = "text" className = "form-control"/>
                     </div>

                     <div className = "form-group">
                        <textarea className = "form-control" rows = "8"/>
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
