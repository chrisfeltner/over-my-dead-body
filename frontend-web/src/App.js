import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import Signin from './components/signin/Signin.js';
import Register from './components/register/Register.js';
import NoteNav from './components/notenav/NoteNav.js';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Main JS file that will run all components of the client
class App extends Component
{
   constructor()
   {
      super();
      this.state =
      {
         userID:"",
         token: "",
         mount: "login",
         displayMessages: false
      }
   }

   // Callback function to hold global values
   receiver = (responseData) =>
   {
      this.setState({ token: responseData });
   }

   mount = (newMount) =>
   {
      this.setState({ mount: newMount });
   }

   render()
   {
      // We will only include component classes or function names here
      return (
         <div className = "App">
            {
               // Branches to switch between login and home page
               (this.state.mount === "home")
               ?
                     <div>
                        <Navigation token = {this.state.token} mount = {this.mount} />
                        <NoteNav token = {this.state.token} />
                     </div>
               :
                  (
                     this.state.mount === "login"
                     ?
                        <Signin mount = {this.mount} token = {this.state.token} />
                     :
                        <Register receiver = {this.receiver} mount = {this.mount} token = {this.state.token} />
                  )
            }
         </div>
      );
   }
}

export default App;
