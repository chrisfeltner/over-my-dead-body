import React, { Component } from 'react';
import NoteObject from '../noteobject/NoteObject.js';
import NewNote from '../modals/NewNote.js';
//import ConfirmLife from '../modals/ConfirmLife.js'
import Timer from '../timer/Timer.js';
import DeleteConfirmation from '../modals/DeleteConfirmation.js';
import EditNote from '../modals/EditNote';
import axios from 'axios';
import setAuthToken from '../../utils/auth';

const URL_PREFIX = "";
axios.defaults.withCredentials = true;

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

   // Creates new note
   addNote = (note) =>
   {
      let newnotes = [...this.state.notes, note];

      let addNoteURL = "/createNote";

      this.setState(
      {
         notes: newnotes
      });

      let newNote =
      {
         "subject": note.subject,
         "recipients": note.recipients,
         "noteBody": note.body
      }

      axios(
      {
         method: 'POST',
         url: addNoteURL,
         data: newNote,
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then((response) =>
      {
         console.log("CreateNote: Success");
         console.log(response.data);
         setAuthToken(response.data);
      })
      .catch((response) =>
      {
         console.log("CreateNote: Unsuccessful");
         console.log(response);
      });
   }

   deleteNote = () =>
   {
      let deleteNoteURL = URL_PREFIX;

      deleteNoteURL += "/deleteNote";
   }

   editNote = () =>
   {
      let editNoteURL = URL_PREFIX;

      editNoteURL += "/setNote"
   }

   hideNotes()
   {
      this.setState({ showNotes: !this.state.showNotes });
   }

   // toggles between display and hide states
   getNotes()
   {
      let getNotesURL = "/getNotes";
      let noteData = null;

      axios(
      {
         method: 'GET',
         url: getNotesURL,
         data: noteData,
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then((response) =>
      {
         console.log("GetNotes: Success");
         console.log(response.data);
         setAuthToken(response.data);

         this.setState(
         {

            showNotes: !this.state.showNotes
         });
      })
      .catch((response) =>
      {
         console.log("GetNotes: Unsuccessful");
         console.log(response);
      });

      // Uncomment if testing the GET request
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
                        onClick = {() => this.hideNotes()}
                     >
                     Hide All
                     </button>
               }

               <div className = "ml-auto mr-5 mt-3">
                  <Timer startCount = "100"/>
               </div>
            </div>

            <div className = "d-flex flex-row justify-content-start flex-wrap">
               {
                  // Checks if it should display all note objects
                  (this.state.showNotes)
                  ?
                     // Displays all current notes
                     this.state.notes.map((note, i) =>
                     (
                        <NoteObject key = {i} note = {note}/>
                     ))
                  :
                     null
               }
            </div>

            {/*<ConfirmLife />*/}
            <NewNote addNote = {this.addNote} editNote = {this.editNote}/>
            <DeleteConfirmation />
            <EditNote />

         </div>
      );
   }
}

export default NoteNav;
