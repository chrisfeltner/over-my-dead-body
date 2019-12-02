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
         deadline:'',
         mount: "login",
         displayMessages: false
      }
   }

   clearToken = () =>
   {
      this.setState(
      {
         token: ""
      });
   }

   setDeadline = (newDeadline) => {
      this.setState({
         deadline: new Date(newDeadline)
      })
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
                        <Navigation token = {this.state.token} mount = {this.mount} deadline={this.state.deadline} setDeadline={this.setDeadline} clearToken = {this.clearToken}/>
                        <NoteNav token={this.state.token} deadline={this.state.deadline}/>
                     </div>
               :
                  (
                     this.state.mount === "login"
                     ?
                        <Signin receiver = {this.receiver} mount = {this.mount} />
                     :
                        <Register receiver = {this.receiver} mount = {this.mount} />
                  )
            }
         </div>
      );
   }
}

export default App;
