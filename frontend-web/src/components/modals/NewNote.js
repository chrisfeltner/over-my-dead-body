import React, { Component } from 'react';

const URL_PREFIX = "";

// Form to create a new note.
class NewNote extends Component
{
   constructor(props)
   {
      super(props);

      this.state =
      {
         subject: null,
         recipient: null,
         body: null
      }
   }

   handleChange = (event) =>
   {
      this.setState(
      {
         [event.target.id]: event.target.value
      });
   }

   // TODO: Clear form after submit

   handleSaveNote = (event) =>
   {
      let newNoteURL = URL_PREFIX;

      console.log("subject", this.state.subject);
      console.log("recipient", this.state.recipient);
      console.log("body", this.state.body);

      newNoteURL += "/createNote";

      fetch(newNoteURL,
      {
         method: "POST",
         headers:
         {
            "subject": this.state.subject,
            "body": this.state.body
         }
      })
      .then((response) => response.json())
      .then((responseData) =>
      {
         console.log("POST request response data", responseData);
      })
      .catch((error) =>
      {
         // If POST request fails
         console.error(error);
      });

      this.props.addNote(this.state);
   }

   render()
   {
      return(
         <div id = "newNoteModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header">
                     <h5 className = "modal-title">New Note</h5>

                     <button type = "button" className = "close" data-dismiss = "modal" aria-label = "Close">
                        <span aria-hidden = "true">&times;</span>
                     </button>
                  </div>

                  <div className = "modal-body">
                     <div className = "form-group">
                        <label>To</label>
                        <input id = "recipient" type = "email" className = "form-control" onChange = {this.handleChange}/>
                     </div>

                     <div className = "form-group">
                        <label>Subject</label>
                        <input id = "subject" type = "text" className = "form-control" onChange = {this.handleChange}/>
                     </div>

                     <div className = "form-group">
                        <textarea id = "body" className = "form-control" rows = "8" onChange = {this.handleChange}/>
                     </div>
                  </div>

                  <div className = "modal-footer">
                     <button
                        type = "button"
                        className = "btn btn-outline-danger"
                        data-dismiss = "modal"
                     >
                     Close
                     </button>

                     <button
                        type = "button"
                        className = "btn btn-success"
                        data-dismiss = "modal"
                        onClick = {this.handleSaveNote}
                     >
                     Save Note
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default NewNote;
