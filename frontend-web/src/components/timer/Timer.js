import React, { Component } from 'react';
import EditDeadline from '../modals/EditDeadline.js';
//import ConfirmLife from '../modals/ConfirmLife.js';

// Timer component, once the timer is up the
// ConfirmLife object modal will popup
class Timer extends Component
{
   constructor(props)
   {
      super(props);
      this.state =
      {
         token: props.token
      }
   }

   render()
   {

      return(
         <div className = "card" style = {{ width: "19rem" }}>
            <div className = "card-header bg-secondary border border-secondary">
               <h6 className = "card-title m-auto">Countdown to Next Check-in</h6>
            </div>

            <div className = "d-flex justify-content-center">
               <p>{new Date(this.props.deadline).toDateString()} at {new Date(this.props.deadline).toLocaleTimeString("en-US")}</p>
            </div>

            <button
            className = "btn btn-outline-secondary btn-sm"
            data-toggle = "modal"
            data-target = "#editDeadlineModal"
            >
            Change
            </button>

            <EditDeadline deadline={this.props.deadline} setDeadline={this.setDeadline}/>
         </div>
      );
   }
}

export default Timer;
