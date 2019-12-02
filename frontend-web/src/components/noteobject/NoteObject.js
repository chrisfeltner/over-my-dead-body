import React, { Component } from 'react';
import Tilt from 'react-tilt';

// This class will be embedded in a categories component

// Separate component for note items
class NoteObject extends Component
{
   constructor(props)
   {
      super(props);
   }

   handleEditClick = () => {
      this.props.setSelectedNoteId(this.props.note._id);
      this.props.setIsAddNote(false);
   }

   handleDeleteClick = () => {
      this.props.setSelectedNoteId(this.props.note._id)
   }

   // Basic parts to note components
   render()
   {
      return(
         <Tilt id = "note" className = "d-flex card mt-3 ml-4 border border-secondary" options = {{ max: 25, scale: 1 }} style = {{width: "18rem"}}>
            <div className = "card-body">
               <h5 className = "card-title">{this.props.note.subject}</h5>
               <h6 className = "card-subtitle mb-2 text-muted">To: {(this.props.note.recipients === undefined ? 
                  "Nobody" : (this.props.note.recipients.length > 1 ? `${this.props.note.recipients[0]} and ${this.props.note.recipients.length} others` : 
                  this.props.note.recipients[0]))}</h6>
            </div>

            <div className = "d-flex flex-row-reverse p-1">
               <button
                  type = "button"
                  className = "btn btn-outline-danger btn-sm"
                  data-toggle = "modal"
                  data-target = "#deleteModal"
                  onClick={this.handleDeleteClick}
               >
               Delete
               </button>

               <button
                  onClick={this.handleEditClick}
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
