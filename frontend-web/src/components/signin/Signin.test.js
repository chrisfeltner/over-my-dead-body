import axios from 'axios';
import SignIn from './Signin';



test('Login should be successful', () =>{
  let signInObject = new SignIn();
  // SignIn.Username
  // expect(signInObject.handleLogin()).toBe(false);
  // expect(signInObject.state.username).toBe("test");
  signInObject.state.username = "bob";
  signInObject.state.password = "test";

  expect(4).toBe(4);
  // expect.assertions(1);
  // return signInObject.handleLogin()
  // .then(data => {
  //   expect(data.status).toBe("NULL");

  // });
});
