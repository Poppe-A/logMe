import React, { useState, useEffect, useContext } from 'react';
import LogService from '../../services/LogService';
import AppHeader from '../../components/Header';
import BackView from '../../components/BackView';
import { LoginContext } from '../../contexts/LogContext';
import Logo from '../../components/Logo';

import './LogPage.css';

function LogPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alreadyWelcomed, setAlreadyWelcomed] = useState(false);
  const { loginStatus, updateLoginStatus } = useContext(LoginContext);

  useEffect(() => {
    LogService.getUser().then((res) => {
      setTimeout(() => {
        setAlreadyWelcomed(true);
        if (res.data.user) {
          updateLoginStatus(true);
        }
      }, 2500);
    });
  }, []);

  const register = (e) => {
    e.preventDefault();
    LogService.register(username, password).then();
  };

  const login = (e) => {
    e.preventDefault();
    LogService.login(username, password).then((res) => {
      if (!res.data.logged) {
        setErrorMessage(res.data.message);
        updateLoginStatus(false);
        setTimeout(() => setErrorMessage(''), 3000);
      } else {
        updateLoginStatus(true);
      }
    });
  };

  //prepare login page

  const loginPage = (
    <>
      <AppHeader txt={null} />
      <form className="logContainer" onSubmit={isRegister ? register : login}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>

        <input
          className="logInput"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="logInput"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="errorMessage">{errorMessage}</p>
        <input
          className="submitButton"
          type="submit"
          value={isRegister ? 'Register' : 'Log in'}
          required
        />
        <p className="logDetail" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Use an existing account' : 'Register'}
        </p>
      </form>
    </>
  );

  const landingPage = (
    <div className="landingLogoContainer">
      <Logo size="large" />
    </div>
  );

  return (
    <div className="logPage">
      <BackView />
      {!loginStatus && !alreadyWelcomed ? landingPage : loginPage}
    </div>
  );
}

export default LogPage;
