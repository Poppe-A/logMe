import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LogService from '../../services/LogService';
import { LoginContext } from '../../contexts/LogContext';

import './WelcomePage.css';
import BackView from '../../components/BackView';
import Footer from '../../components/Footer';

export default function WelcomePage() {
  const { updateLoginStatus } = useContext(LoginContext);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    LogService.getUser().then((res) => {
      setUsername(res.data.user.username);
    });
  }, []);
  return (
    <div className="welcomePage">
      <BackView />
      <Header></Header>

      {/* <ul className="welcomeMenu">
        <li>
          <Link className="welcomeLink" to="/newSession">
            - New session -
          </Link>
        </li>
        <li>
          <Link className="welcomeLink" to="/sports">
            My sports
          </Link>
        </li>
        <li>
          <Link className="welcomeLink" to="/mySessions/all">
            My sessions
          </Link>
        </li>
        <li
          className="welcomeLink"
          onClick={() =>
            LogService.logOut().then(() => {
              updateLoginStatus(false);
            })
          }
        >
          Log out
        </li>
      </ul> */}
      <h2>Welcome back {username}</h2>
      <Footer />
    </div>
  );
}
