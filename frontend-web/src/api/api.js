import axios from 'axios';

axios.defaults.withCredentials = true;

const URLs = {
    loginURL:'/users/login'
}

export const loginRequest = async (username, password) => {
    let payload = {
        userId: '',
        token: '',
        error: ''
    };

    let body = {
        username: username,
        password: password
    }

    await axios.post( URLs.loginURL, body)
        .then((response) =>
        {
           console.log("Login: Success");
           payload.userId = response.data.userId;
           payload.token = response.data.token;
           console.log(payload.userId)
        })
        .catch((response) =>
        {
           console.log("Login: Unsuccessful");
           console.log(response);
           payload.error = response.data;
        });
}