import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Footer.css';
import HomeLogo from '../img/home.png';
import SportLogo from '../img/dumbbell.png';
import SessionLogo from '../img/play.png';
import LogOutLogo from '../img/off.png';
import LogService from '../services/LogService';
import { LoginContext } from '../contexts/LogContext';

function Footer() {
  const { updateLoginStatus } = useContext(LoginContext);

  const history = useHistory();
  return (
    <div className="footer">
      <ul>
        <li>
          <Link className="welcomeLink" to="/">
            <img src={HomeLogo} alt="home logo" />
          </Link>
        </li>
        <li>
          <Link className="welcomeLink" to="/sports">
            <img src={SportLogo} alt="SportLogo" />
          </Link>
        </li>
        <li>
          <Link className="welcomeLink" to="/newSession">
            <img src={SessionLogo} alt="SessionLogo" />
          </Link>
        </li>
        <li
          className="logOut"
          onClick={() =>
            LogService.logOut().then((a) => {
              updateLoginStatus(false);
              history.push('/');
            })
          }
        >
          <img src={LogOutLogo} alt="AccountLogo" />
        </li>
      </ul>
    </div>
  );
}

export default Footer;
