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
         count: 1,
      }
   }
   render()
   {
      const { count } = this.state;

      return(
         <div className = "card" style = {{ width: "19rem" }}>
            <div className = "card-header bg-secondary border border-secondary">
               <h6 className = "card-title m-auto">Countdown to Next Check-in</h6>
            </div>

            <div className = "m-auto">
               <p>{ count }s</p>
            </div>
         </div>
      );
   }

   // This will run timer
   componentDidMount()
   {
      const { startCount } = this.props;

      this.setState(
      {
         count: startCount
      })

      // setInterval
      this.myInterval = setInterval(() =>
      {
         this.setState(
         {
            count: this.state.count - 1
         })
      }, 1000);
   }

   // clearInterval, this will prevent any memory leaks
   componentWillUnmount()
   {
      clearInterval(this.myInterval)
   }
}

export default Timer;
