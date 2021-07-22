/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackView from '../../components/BackView';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Session from '../../components/Session';
import SportService from '../../services/SportService';
import './SessionPage.css';

export default function SessionPage(props) {
  const history = useHistory();
  const sport = props.match.params.sport;
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    SportService.getSessions(sport).then((res) => {
      setSessions(res.data);
    });
  }, []);

  let sessionTiles = null;
  if (!sessions.length) {
    sessionTiles = 'No sports found with your account';
  } else {
    sessionTiles = sessions.map((session, index) => (
      <Session key={index} session={session} displaySport={sport === 'all'} />
    ));
  }
  return (
    <div className="sessionPage">
      <BackView />
      <Header txt={sport === 'all' ? 'All sessions' : sport} />
      <div className="sessionPageContainer">
        <div className="sessionOrExercise">
          <p className="selectedLink">My sessions</p>
          {sport !== 'all' ? (
            <p onClick={() => history.push(`/myExercises/${sport}`)}>
              My exercises
            </p>
          ) : null}
        </div>
        <div className="sessionTilesContainer">{sessionTiles}</div>
        <div
          className="launchSession"
          onClick={() => history.push(`/newSession`)}
        >
          Launch a session !
        </div>
      </div>
      <Footer />
    </div>
  );
}
