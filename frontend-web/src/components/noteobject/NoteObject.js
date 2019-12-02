import React, { Component } from 'react';
import Tilt from 'react-tilt';

// This class will be embedded in a categories component

// Separate component for note items
class NoteObject extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         subject: props.note.subject,
         recipients: props.note.recipients,
         id: props.note._id
      }
   }

   setNoteId = () => {
      this.props.setSelectedNoteId(this.state.id)
   }

   // Basic parts to note components
   render()
   {
      return(
         <Tilt id = "note" className = "d-flex card mt-3 ml-4 border border-secondary" options = {{ max: 25, scale: 1 }} style = {{width: "18rem"}}>
            <div className = "card-body">
               <h5 className = "card-title">{this.state.subject}</h5>
               <h6 className = "card-subtitle mb-2 text-muted">To: {(this.state.recipients === undefined ? 
                  "Nobody" : (this.state.recipients.length > 1 ? `${this.state.recipients[0]} and ${this.state.recipients.length} others` : 
                  this.state.recipients[0]))}</h6>
            </div>

            <div className = "d-flex flex-row-reverse p-1">
               <button
                  type = "button"
                  className = "btn btn-outline-danger btn-sm"
                  data-toggle = "modal"
                  data-target = "#deleteModal"
                  onClick={this.setNoteId}
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
      );
   }
}

export default NoteObject;
