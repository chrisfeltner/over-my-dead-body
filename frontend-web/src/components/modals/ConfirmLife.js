import React, { Component } from 'react';

// Modal for user confirmation
class ConfirmLife extends Component
{
   render()
   {
      return(
         <div id = "confirmLifeModal" className = "modal fade" tabIndex = "-1" role = "dialog">
            <div className = "modal-dialog modal-dialog-centered" role = "document">
               <div className = "modal-content">
                  <div className = "modal-header">
                     <h5 className = "modal-title" id = "exampleModalLongTitle">Are you alive?</h5>
                  </div>

                  <div className = "modal-footer">
                     <button type = "button" className = "btn btn-success btn-md" data-dismiss = "modal">Yes</button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default ConfirmLife;
