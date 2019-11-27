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
      }
   }
   render()
   {
      return(
         <div className = "card" style = {{ width: "19rem" }}>
            <div className = "card-header bg-secondary border border-secondary">
               <h6 className = "card-title m-auto">Countdown to Next Check-in</h6>
            </div>

            <div className = "m-auto">
               <p></p>
            </div>
         </div>
      );
   }
}

export default Timer;
