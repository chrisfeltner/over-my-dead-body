import React, { Component } from 'react';

// Form to create a new note.
class NewNote extends Component
{
   constructor(props)
   {
      super(props);

      this.state =
      {
         subject: null,
         recipients: [],
         newRecipient: null,
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

   handleRecipient = (event) =>
   {
      this.setState(
      {
         [event.target.id]: event.target.value
      });
   }

   // TODO: Clear form after submit

   handleSaveNote = (event) =>
   {
      this.state.recipients.push(this.state.newRecipient);

      console.log("subject", this.state.subject);
      console.log("recipients", this.state.recipients);
      console.log("body", this.state.body);

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
                        <input id = "newRecipient" type = "email" className = "form-control" onChange = {this.handleRecipient}/>
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
