import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import Signin from './components/signin/Signin.js';
import Register from './components/register/Register.js';
import NoteNav from './components/notenav/NoteNav.js';
import axios from 'axios';
import moment from 'moment';

// Bootstrap styling
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.withCredentials = true;

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
         deadline: "",
         selectedDeadline: "",
         mount: "login",
         displayMessages: false,
         searchTerm: ''
      }
   }

   clearToken = () =>
   {
      this.setState(
      {
         token: ""
      });
   }

   editSelectedDeadline = (value) =>
   {
      this.setState(
      {
         selectedDeadline: value
      })
   }

   setSelectedDeadline = () =>
   {
      this.setState(
      {
         selectedDeadline: this.state.deadline
      });
   }

   setSearch = (term) => {
      this.setState(
      {
         searchTerm: term
      });
   }

   setDeadline = (newDeadline) =>
   {
      this.setState(
      {
         deadline: newDeadline
      })
   }

   editDeadline = () =>
   {
      let confirmLifeURL = "users/confirmLife";

      let newDeadline = moment(this.state.selectedDeadline).valueOf();

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`;

      axios(
      {
         method: 'POST',
         url: confirmLifeURL,
         data: { 'deadline': newDeadline },
         config: { headers: { 'Content-Type': 'application/json'}}
      })
      .then(() =>
      {
         console.log("editDeadline: Success");

         this.setDeadline(newDeadline)
      })
      .catch((response) =>
      {
         console.log("editDeadline: Unsuccessful");
         console.log(response);
      });
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
                        <Navigation token = {this.state.token} mount = {this.mount} deadline = {this.state.deadline} setDeadline = {this.setDeadline} clearToken = {this.clearToken} searchTerm={this.state.searchTerm}
                        setSearch={this.setSearch}/>
                        <NoteNav
                           token = {this.state.token}
                           editSelectedDeadline = {this.editSelectedDeadline}
                           selectedDeadline = {this.state.selectedDeadline}
                           deadline = {this.state.deadline}
                           setSelectedDeadline = {this.setSelectedDeadline}
                           editDeadline = {this.editDeadline}
                           searchTerm={this.state.searchTerm}
                        />
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
