import React, { Component } from 'react';
import EditDeadline from '../modals/EditDeadline.js';
import moment from 'moment'
//import ConfirmLife from '../modals/ConfirmLife.js';

// Timer component, once the timer is up the
// ConfirmLife object modal will popup
class Timer extends Component
{
   constructor(props)
   {
      super(props);
   }

   handleChangeClick = () =>
   {
      this.props.setSelectedDeadline();
   }

   render()
   {
      return(
         <div className = "card" style = {{ width: "19rem" }}>
            <div className = "card-header bg-secondary border border-secondary">
               <h6 className = "card-title m-auto">Countdown to Next Check-in</h6>
            </div>

            <div className = "d-flex justify-content-center">
               <p>{moment(this.props.deadline).format("LLLL")}</p>
            </div>

            <button
               className = "btn btn-outline-secondary btn-sm"
               data-toggle = "modal"
               data-target = "#editDeadlineModal"
               onClick = {this.handleChangeClick}
            >
            Change
            </button>

            <EditDeadline
               deadline = {this.props.selectedDeadline}
               editSelectedDeadline = {this.props.editSelectedDeadline}
               editDeadline = {this.props.editDeadline}
            />
         </div>
      );
   }
}

export default Timer;
