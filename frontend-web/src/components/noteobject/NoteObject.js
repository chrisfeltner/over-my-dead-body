import React, { Component } from 'react';
import Tilt from 'react-tilt';
import DeleteConfirmation from '../modals/DeleteConfirmation.js';
import EditNote from '../modals/EditNote';

// This class will be embedded in a categories component

// Separate component for note items
class NoteObject extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         notes: props.notes
      }
   }

   // Basic parts to note components
   render()
   {
      return(
         <div className = "d-flex justify-content-start flex-wrap">
            {
               this.state.notes.map(note =>
               {
                  return(
                     <Tilt id = "note" className = "card mt-3 ml-4 border border-secondary" options = {{ max: 25, scale: 1 }} style = {{width: "18rem"}}>
                        <div className = "card-body">
                           <h5 className = "card-title">{note.subject}</h5>
                           <h6 className = "card-subtitle mb-2 text-muted">To: {note.recipient}</h6>
                        </div>

                        <div className = "d-flex flex-row-reverse p-1">
                           <button
                              type = "button"
                              className = "btn btn-outline-danger btn-sm"
                              data-toggle = "modal"
                              data-target = "#deleteModal"
                           >
                           Delete
                           </button>

                           <button
                              className = "btn btn-outline-secondary btn-sm"
                              data-toggle = "modal"
                              data-target = "#editNoteModal"
                           >
                           Edit
                           </button>
                        </div>
                     </Tilt>
                  )
               })
            }

            <DeleteConfirmation />
            <EditNote />
         </div>
      );
   }
}

export default NoteObject;
