import React, { Component } from 'react';
import NoteObject from '../noteobject/NoteObject.js';
//import ConfirmLife from '../modals/ConfirmLife.js'
import Timer from '../timer/Timer.js';
import DeleteConfirmation from '../modals/DeleteConfirmation.js';
import NoteForm from '../modals/NoteForm.js';
import axios from 'axios';

axios.defaults.withCredentials = true;

// Navigations for note items
class NoteNav extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         token: props.token,
         notes:[],
         showNotes: false,
         selectedNoteId: '',
         selectedNote: '',
         isAddNote: false,
      }
   }

   componentDidMount() {
      this.getNotes()
   }

   setIsAddNote = (val) => {
      this.setState({
         isAddNote: val
      })
   }

   setSelectedNoteId = (id) => {
      this.setState({selectedNoteId: id})
      let note = this.state.notes.filter((note) => {
         return note._id === id
      })[0];
      this.setState({selectedNote: note})
   }

   editSelectedNote = (id, value) => {
      this.setState({
         selectedNote: {
            ...this.state.selectedNote,
            [id]: value
         }
      })
   }

   // Creates new note
   addNote = (note) =>
   {
      let newnotes = [...this.state.notes, note];

      let addNoteURL = "notes/createNote";

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

      axios.defaults.headers.common['authorization'] = `Bearer ${this.state.token}`;

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
      })
      .catch((response) =>
      {
         console.log("CreateNote: Unsuccessful");
         console.log(response);
      });
   }

   deleteNote = (id) =>
   {
      let deleteNoteURL = "notes/deleteNote";

      let body = {
         '_id':id
      }

      axios.defaults.headers.common['authorization'] = `Bearer ${this.state.token}`;

      axios(
         {
            method: 'DELETE',
            url: deleteNoteURL,
            data: body,
            config: { headers: { 'Content-Type': 'application/json'}}
         })
         .then((response) =>
         {
            console.log("Delete Note: Success");
         }).then(() => {
            this.setState({
               notes: this.state.notes.filter((note) => {
                  return note._id !== this.state.selectedNoteId
               }),
               selectedNoteId: '',
               selectedNote: ''
            })
         })
         .catch((response) =>
         {
            console.log("Delete Notes: Unsuccessful");
            console.log(response);
         });
   }

   editNote = () =>
   {
      let setNoteURL = "notes/setNote";

      let body = this.state.selectedNote

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;

      axios(
         {
            method: 'POST',
            url: setNoteURL,
            data: body,
            config: { headers: { 'Content-Type': 'application/json'}}
         })
         .then((response) =>
         {
            console.log("Set Note: Success");
         }).then(() => {
            this.getNotes()
         })
         .catch((response) =>
         {
            console.log("Set Notes: Unsuccessful");
            console.log(response);
         });
   }

   hideNotes()
   {
      this.setState({ showNotes: !this.state.showNotes });
   }

   // toggles between display and hide states
   getNotes()
   {
      let getNotesURL = "notes/getNotes";
      let noteData = null;

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;

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

         this.setState(
         {
            notes: response.data
         }, () => {
            this.setState({
               showNotes: true
            })
         });
      })
      .catch((response) =>
      {
         console.log("GetNotes: Unsuccessful");
         console.log(response);
      });

      // Uncomment if testing the GET request
      //this.setState({ showNotes: !this.state.showNotes });
   }

   handleNewNote = () =>
   {
      this.setState(
      {
         selectedNoteId: '',
         selectedNote:
         {
            recipients: [],
            noteBody: '',
            subject: ''
         }
      });

      this.setIsAddNote(true);
   }

   render()
   {
      return(
         <div className = "mb-4">
            <div className = "d-flex">
               <button
                  className = "btn btn-secondary rounded border align-self-start mt-5 ml-5"
                  data-toggle = "modal"
                  data-target = "#editNoteModal"
                  onClick={this.handleNewNote}
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
                  <Timer deadline = {this.state.deadline}/>
               </div>
            </div>

            <div className = "d-flex flex-row justify-content-start flex-wrap">
               {
                  // Checks if it should display all note objects
                  (this.state.showNotes && this.state.notes !== null)
                  ?
                     // Displays all current notes
                     this.state.notes.map((note, id) =>
                     (
                        <NoteObject
                           key={id}
                           note={note}
                           setSelectedNoteId={this.setSelectedNoteId}
                           setIsAddNote={this.setIsAddNote}
                        />
                     ))
                  :
                     null
               }
            </div>

            {/*<ConfirmLife />*/}
            <DeleteConfirmation selectedNoteId={this.state.selectedNoteId} deleteNote={this.deleteNote}/>

            <NoteForm
               addNote = {this.addNote}
               isAddNote = {this.state.isAddNote}
               editNote = {this.editNote}
               editSelectedNote = {this.editSelectedNote}
               note = {this.state.selectedNote}
            />

         </div>
      );
   }
}

export default NoteNav;
