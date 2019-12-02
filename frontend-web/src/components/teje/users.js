// users.js
import axios from 'axios';

class Users {
  static all() {
    // return axios({method: 'post'}).then(resp => resp.data);
    return axios.post('/users.json').then(resp => resp.data);

  }
}

export default Users;
