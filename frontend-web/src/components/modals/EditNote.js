import React, { Component } from 'react';

// Form to edit an existing new note.
class EditNote extends Component
{
   constructor(props)
   {
      super(props);
   }

   handleSaveNote = () => {
      this.props.isAddNote ? this.props.addNote() : this.props.editNote()
   }

   handleChange = (event) =>
   {
      if(event.target.id === 'recipients')
      {
         // Remove whitespace from string and make into semicolon separated array
         this.props.editSelectedNote(event.target.id, event.target.value.replace(/\s/g, '').split(';'))
      }
      else{
         this.props.editSelectedNote(event.target.id, event.target.value)
      }
   }

   render()
   {
      return(
         <div id = "editNoteModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header">
                     <h5 className = "modal-title">{this.props.isAddNote ? 'Add Note' : 'Edit Note'}</h5>

                     <button type = "button" className = "close" data-dismiss = "modal" aria-label = "Close">
                        <span aria-hidden = "true">&times;</span>
                     </button>
                  </div>

                  <div className = "modal-body">
                     <div className = "form-group">
                        <label>To</label>
                        <input id='recipients' type = "email" className = "form-control" onChange = {this.handleChange}
                           value={this.props.note.recipients === undefined ? '' : this.props.note.recipients.join(';')}/>
                     </div>

                     <div className = "form-group">
                        <label>Subject</label>
                        <input id='subject' type = "text" className = "form-control" onChange = {this.handleChange}
                           value={this.props.note.subject}/>
                     </div>

                     <div className = "form-group">
                        <textarea id='noteBody' className = "form-control" rows = "8" onChange = {this.handleChange}
                           value={this.props.note.noteBody}/>
                     </div>
                  </div>

                  <div className = "modal-footer">
                     <button type = "button" className = "btn btn-outline-danger" data-dismiss = "modal">Cancel</button>
                     <button type = "button" className = "btn btn-success" data-dismiss = "modal"
                        onClick={this.handleSaveNote}>Save Note</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default EditNote;
