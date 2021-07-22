import Axios from 'axios';

const LogService = {
  register(registerUsername, registerPassword) {
    return Axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login/register',
    });
  },

  login(loginUsername, loginPassword) {
    return Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: 'http://localhost:4000/login/login',
    });
  },

  getUser() {
    return Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/login/user',
    });
  },

  logOut() {
    return Axios({
      method: 'DELETE',
      withCredentials: true,
      url: 'http://localhost:4000/login/logOut',
    });
  },
};

export default LogService;
