import axios from 'axios';
import SignIn from './Signin';
jest.mock('axios');


test("calls axios and successful log in", async() => {
  let signInObject = new SignIn();
  const info =       {
           username: "bob",
           password: "test"
        };
  const resp = {data:info};
  signInObject.state.username = "bob";
  signInObject.state.password = "test";
  axios.post.mockImplementation(() => Promise.resolve(info));

  await expect(signInObject.handleLogin('home')).resolves.toEqual(data);
  // return signInObject.handleLogin().then(data => expect(info.username).toEqual(signInObject.state.username));

});

test("calls axios and fails log in", async() => {
  let signInObject = new SignIn();
  const info =       {
           username: "bob",
           password: "test"
        };
  const resp = {data:info};
  signInObject.state.username = "bob";
  signInObject.state.password = "tes";
  axios.post.mockImplementation(() => Promise.reject(info));

  await expect(signInObject.handleLogin('home')).rejects.toThrow(data);
  // retur
});


test('Make sure test works', () =>{

  // const loginObjects = {username:'Test',
  //                       password:'Pass'};
  // const users = [{name: 'Bob'}];
  // const resp = {data: users};
  // axios.post.mockResolvedValue(resp);
  // return signInObject.handleLogin().then(data=> expect(data).toEqual(users));

//   // SignIn.Username
//   // expect(signInObject.handleLogin()).toBe(false);
//   // expect(signInObject.state.username).toBe("test");
//

//
//
  expect(4).toBe(4);
//   // expect.assertions(1);
//   // return signInObject.handleLogin()
//   // .then(data => {
//   //   expect(data.status).toBe("NULL");
//
//   // });
});

// test('Make an axios call', () => {
//   let signInObject = new SignIn();
//
// })
