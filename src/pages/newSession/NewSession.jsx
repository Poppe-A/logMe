import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { SessionContext } from '../../contexts/CurrentSessionContext';
import SportService from '../../services/SportService';
import Stopwatch from '../../components/Stopwatch';

import chronoLogo from '../../img/chrono.png';
import './NewSession.css';
import BackView from '../../components/BackView';

function NewSession() {
  const history = useHistory();

  //props which must stay in context, to keep it if you need to quit the session and come back
  const {
    currentSession,
    setCurrentSession,
    sessionName,
    setSessionName,
    sessionSport,
    setSessionSport,
    sessionExercises,
    setSessionExercises,
    resetSession,
  } = useContext(SessionContext);

  //props which don't
  const [continueSession, setContinueSession] = useState(false);
  const [availableSports, setAvailableSports] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState(null);
  const [score, setScore] = useState(null);
  const [introDone, setIntroDone] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [finalScreen, setFinalScreen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  let sessionIntro = null;

  //get sports to initiate the session, then exercises related to this sport
  useEffect(() => {
    SportService.getSports().then((res) => setAvailableSports(res.data));
  }, []);

  useEffect(() => {
    if (sessionSport) {
      SportService.getExercises(sessionSport).then((res) =>
        setAvailableExercises(res.data)
      );
    }
  }, [sessionSport]);

  const addExercise = (e) => {
    e.preventDefault();
    const scoreToSend = score.split(' ');
    const exerciseToSend = {
      name: exerciseName,
      score: scoreToSend,
    };
    setSessionExercises([...sessionExercises, exerciseToSend]);
    setShowPopup(false);
    setExerciseName(null);
    setScore(null);
  };

  const finishSession = () => {
    SportService.finishSession({
      name: sessionName,
      sport: sessionSport,
      date: Date.now(),
      sessionExercise: sessionExercises,
    }).then(() => {
      resetSession();
      setFinalScreen('Congrats ! Your sesh has beenn added to your logs');

      setTimeout(() => {
        history.push('/');
      }, 3000);
    });
  };

  const abandonSession = () => {
    resetSession();
    setFinalScreen("Too bad, you'll do better next time !");

    setTimeout(() => {
      history.push('/');
    }, 3000);
  };

  // session intro is the new session page landing view
  // two possibilities : there is a current session (create one) or not (continue it or erase it)
  if (currentSession && !continueSession) {
    sessionIntro = (
      <div className="continueOrNotView">
        <p>Do you want to continue your current session : {sessionName}</p>
        <div className="continueOrNotButtons">
          <button
            onClick={() => {
              setContinueSession(true);
              setIntroDone(true);
            }}
          >
            Yes
          </button>
          <button onClick={resetSession}>No</button>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    sessionIntro = (
      <form
        className="newSessionForm"
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentSession(true);
          setContinueSession(true);
          setIntroDone(true);
        }}
      >
        <p>Welome to this new session !</p>

        <input
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="New session name"
          required
        />
        <p>What are you up to?</p>
        <select
          defaultValue=""
          onChange={(e) => setSessionSport(e.target.value)}
        >
          <option hidden value="">
            Select sport
          </option>
          {availableSports.length
            ? availableSports.map((elm, index) => (
                <option key={index} value={elm.name}>
                  {elm.name}
                </option>
              ))
            : null}
        </select>
        <input className="submitButton" type="submit" value="Start sesh !" />
      </form>
    );
  }

  const sessionView = (
    <div>
      <p className="sessionName">
        {sessionSport} session : {sessionName}
      </p>

      <div className="newSessionExercisesContainer">
        {sessionExercises.map((elm, index) => (
          <div key={index} className="newSessionExercise">
            <p>{elm.name}</p>
            <p>{elm.score.join(' ')}</p>
          </div>
        ))}
        <button onClick={() => setShowPopup(true)}>New Exercise</button>
      </div>

      <div className="sessionButtonContainer">
        <button onClick={finishSession}>Finish session</button>
        <button onClick={abandonSession}>Give out</button>
      </div>
    </div>
  );

  const timer = (
    <div className="timer">
      {showTimer ? (
        <div className="timerAndClose">
          <Stopwatch />
          <p onClick={() => setShowTimer(false)}>X</p>
        </div>
      ) : (
        <img
          src={chronoLogo}
          alt="Toggle chrono"
          onClick={() => setShowTimer(true)}
        />
      )}
    </div>
  );
  const exercisePopup = (
    <div className="exercisePopup">
      <form className="exercisePopupContent" onSubmit={addExercise}>
        <div className="popupHeader">
          <h3>New exercise</h3>
          <p onClick={() => setShowPopup(false)}>X</p>
        </div>
        <select
          defaultValue=""
          onChange={(e) => setExerciseName(e.target.value)}
        >
          <option hidden value="">
            Choose an exercise
          </option>
          {availableExercises.map((elm, index) => (
            <option key={index} value={elm.exerciseName}>
              {elm.exerciseName}
            </option>
          ))}
        </select>
        <p>Enter you score here (if several score, add a space between them)</p>
        <input onChange={(e) => setScore(e.target.value)}></input>
        <input type="submit" value="Validate exercise" />
        {timer}
      </form>
    </div>
  );

  const finalScreenView = (
    <div className="finalScreen">
      <p>{finalScreen}</p>
    </div>
  );
  return (
    <div className="newSessionPage">
      <BackView />
      <Header txt="Let's go !" />
      {introDone ? sessionView : sessionIntro}
      {showPopup ? exercisePopup : null}
      {finalScreen ? finalScreenView : null}
      <Footer />
    </div>
  );
}

export default NewSession;
