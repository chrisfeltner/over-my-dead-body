import React, { Component } from 'react';
//import ConfirmLife from '../modals/ConfirmLife.js';

// Timer component, once the timer is up the
// ConfirmLife object modal will popup
class Timer extends Component
{
   constructor()
   {
      super();
      this.state =
      {
         deadline: "2019-12-11T11:11"
      }
   }
   render()
   {
      let deadlineObject = new Date(this.state.deadline);

      let currentDeadlineDate = deadlineObject.toDateString();

      let currentDeadlineTime = deadlineObject.toLocaleTimeString("en-US");

      return(
         <div className = "card" style = {{ width: "19rem" }}>
            <div className = "card-header bg-secondary border border-secondary">
               <h6 className = "card-title m-auto">Countdown to Next Check-in</h6>
            </div>

            <div className = "m-auto">
               <p>{currentDeadlineDate} {currentDeadlineTime}</p>
            </div>
         </div>
      );
   }
}

export default Timer;
