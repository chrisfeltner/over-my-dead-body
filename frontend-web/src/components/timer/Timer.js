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
      this.state =
      {
         token: props.token,
         years: "",
         months: "",
         days: "",
         hours: "",
         minutes: "",
         seconds: ""
      }
   }

   handleChangeClick = () =>
   {
      this.props.setSelectedDeadline();
   }

   componentDidMount()
   {
      this.myInterval = setInterval(() =>
      {
         let now = moment();
         let deadline = moment(this.props.deadline);

         let diffTime = deadline.diff(now);
         let duration = moment.duration(diffTime);

         this.setState(
         {
            years: duration.years(),
            months: duration.months(),
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds:duration.seconds()
         });

      }, 1000)
   }

   componentWillUnmount()
   {
      clearInterval(this.myInterval);
   }

   render()
   {
      return(
         <div className = "card w-100" style = {{ width: "19rem" }}>
            <div className = "card-header bg-secondary text-white border border-secondary">
               <h6 className = "card-title m-auto">Deadline: {moment(this.props.deadline).format("LLLL")}</h6>
            </div>

            <div className = "d-flex justify-content-center">
               <p>{ this.state.years }:{ this.state.months }:{ this.state.days }:{ this.state.hours }:{ this.state.minutes }:{ this.state.seconds }</p>
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
