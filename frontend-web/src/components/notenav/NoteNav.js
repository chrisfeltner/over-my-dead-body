import React, { Component } from 'react';
import NoteObject from '../noteobject/NoteObject.js';
import NewNote from '../modals/NewNote.js';
//import ConfirmLife from '../modals/ConfirmLife.js'
import Timer from '../timer/Timer.js';

// Navigations for note items
class NoteNav extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         notes:
         [
            { subject: "money", recipient: "Kyle" },
            { subject: "ransom", recipient: "Chris" },
            { subject: "will", recipient: "Kevin" },
            { subject: "knowledge", recipient: "Lloyd" },
            { subject: "more money", recipient: "Stefan" }
         ],
         showNotes: false
      }
   }

   addNote = (note) =>
   {
      let notes = [...this.state.notes, note];

      this.setState(
      {
         notes: notes
      });
   }

   // toggles between display and hide states
   toggleShowNotes()
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
                        onClick = {() => this.toggleShowNotes()}
                     >
                     Display All
                     </button>
                  :
                     <button
                        className = "btn btn-outline-secondary rounded border align-self-start mt-5"
                        onClick = {() => this.toggleShowNotes()}
                     >
                     Hide All
                     </button>
               }

               <div className = "ml-auto mr-5 mt-3">
                  <Timer startCount = "100"/>
               </div>
            </div>

            {
               // Checks if it should display all note objects
               (this.state.showNotes)
               ?
                  <NoteObject notes = {this.state.notes}/>
               :
                  null
            }

            {/*<ConfirmLife />*/}
            <NewNote addNote = {this.addNote}/>

         </div>
      );
   }
}

export default NoteNav;
