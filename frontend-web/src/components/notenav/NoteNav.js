import React, { Component } from 'react';
import NoteObject from '../noteobject/NoteObject.js';
import NewNote from '../modals/NewNote.js';
//import ConfirmLife from '../modals/ConfirmLife.js'
import Timer from '../timer/Timer.js';
import DeleteConfirmation from '../modals/DeleteConfirmation.js';
import EditNote from '../modals/EditNote';

const URL_PREFIX = "";

// Navigations for note items
class NoteNav extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         notes: [],
         showNotes: false
      }
   }

   deleteNote = () =>
   {
      let deleteNoteURL = URL_PREFIX;

      deleteNoteURL += "/deleteNote";
   }

   editNote = () =>
   {
      let editNoteURL = URL_PREFIX;

      editNoteURL += "/setNote";
   }

   addNote = (newnote) =>
   {
      let addNoteURL = URL_PREFIX;

      addNoteURL += "/createNote";

      fetch(addNoteURL,
      {
         method: "POST",
         header:
         {
            "Content-Type": "application/json"
         },
         body:
         {
            "subject": newnote.subject,
            "recipient": newnote.recipient,
            "body": newnote.body
         }
      })
      .then(response => response.text())
      .then(responseData => console.log(responseData))
      .catch(error => console.error("Error:", error));
   }

   // toggles between display and hide states
   getNotes()
   {
      this.setState({ showNotes: !this.state.showNotes });
   }

   render()
   {
      return(
         <div className = "mb-4">
            <div className = "d-flex">
               <button
                  className = "btn btn-secondary rounded border align-self-start mt-5 ml-5"
                  data-toggle = "modal"
                  data-target = "#newNoteModal"
               >
               New Note
               </button>
               {
                  // Toggles between display and hide buttons
                  (!this.state.showNotes)
                  ?
                     <button
                        className = "btn btn-secondary rounded border align-self-start mt-5"
                        onClick = {() => this.getNotes()}
                     >
                     Display All
                     </button>
                  :
                     <button
                        className = "btn btn-outline-secondary rounded border align-self-start mt-5"
                        onClick = {() => this.getNotes()}
                     >
                     Hide All
                     </button>
               }

               <div className = "ml-auto mr-5 mt-3">
                  <Timer startCount = "100"/>
               </div>
            </div>

            <div className = "d-flex justify-content-start flex-wrap">
               {
                  // Checks if it should display all note objects
                  (this.state.showNotes)
                  ?
                     this.state.notes.map((note, i) =>
                     (
                        <NoteObject key = {i} note = {note}/>
                     ))
                  :
                     null
               }
            </div>

            {/*<ConfirmLife />*/}
            <NewNote addNote = {this.addNote}/>
            <DeleteConfirmation deleteNote = {this.deleteNote}/>
            <EditNote editNote = {this.editNote}/>

         </div>
      );
   }
}

export default NoteNav;
