import React, { Component } from 'react';

// Confirmation modal to delete an existing note.
class DeleteConfirmation extends Component
{
   // Basic parts to components
   render()
   {
      return(
         <div id = "deleteModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header bg-danger">
                     <h5 className = "modal-title text-light">Delete Confirmation</h5>

                     <button type = "button" className = "close" data-dismiss = "modal" aria-label = "Close">
                        <span aria-hidden = "true">&times;</span>
                     </button>
                  </div>

                  <div className = "modal-body">
                     <p>Are you sure want to delete this note?</p>
                  </div>

                  <div className = "modal-footer">
                     <button type = "button" className = "btn btn-secondary" data-dismiss = "modal">Cancel</button>
                     <button type = "button" className = "btn btn-danger" data-dismiss = "modal">Yes, Delete</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default DeleteConfirmation;
