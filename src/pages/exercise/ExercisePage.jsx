/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackView from '../../components/BackView';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SportService from '../../services/SportService';
import CloseImage from '../../img/close.png';
import './ExercisePage.css';

export default function ExercisePage(props) {
  const history = useHistory();
  const sport = props.match.params.sport;

  const [exercises, setExercises] = useState([]);
  const [sports, setSports] = useState([]);
  const [isFormShown, setIsFormShown] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newExerciseSport, setNewExerciseSport] = useState();
  const [newExerciseType, setNewExerciseType] = useState();
  const [displayError, setDisplayError] = useState(null);

  useEffect(() => {
    SportService.getExercises(sport).then((res) => {
      setExercises(res.data);
    });
    SportService.getSports().then((res) => {
      setSports(res.data);
    });
  }, []);

  let exercisesTiles = exercises.map((elm, index) => (
    <div key={index} className="exerciceTile">
      {elm.exerciseName}
    </div>
  ));
  if (!exercises.length) {
    exercisesTiles = `No ${sport} exercises found`;
  }

  const validForm = (e) => {
    e.preventDefault();
    if (newExerciseName === '' || newExerciseSport === '') {
      setDisplayError('Please fill all inputs');
      setTimeout(() => setDisplayError(null), 2000);
    } else {
      sendExercise()
        .then(() => {
          SportService.getExercises(sport).then((res) => {
            setExercises(res.data);
            setIsFormShown(false);
          });
        })
        .catch(() => {
          setDisplayError('There is a problem while creating this exercise');
          setTimeout(() => {
            setIsFormShown(false);
            setDisplayError(null);
          }, 2000);
        });
    }
  };

  const sendExercise = () => {
    const exercise = {
      name: newExerciseName,
      sport: newExerciseSport,
      type: newExerciseType,
    };
    return SportService.addExercise(exercise);
  };

  const exerciseForm = (
    <div className="exerciseForm">
      <form className="exerciseFormContent" onSubmit={validForm}>
        <h3>Add an exercise</h3>
        <img
          src={CloseImage}
          alt="Close"
          onClick={() => setIsFormShown(false)}
        />
        <input
          placeholder="name"
          onChange={(e) => setNewExerciseName(e.target.value)}
        />

        <select
          defaultValue=""
          onChange={(e) => setNewExerciseSport(e.target.value)}
        >
          <option hidden value="">
            Select Sport
          </option>
          {sports.map((elm, index) => (
            <option key={index} value={elm.name}>
              {elm.name}
            </option>
          ))}
        </select>

        <select
          defaultValue=""
          onChange={(e) => setNewExerciseType(e.target.value)}
        >
          <option hidden value="">
            Select type
          </option>
          <option value="repeat">Repeat</option>
          <option value="amount">Time/length/number</option>
        </select>
        {displayError ? <p>Please fill all inputs</p> : null}
        <input className="submitButton" type="submit" value="Add exercise" />
      </form>
    </div>
  );

  return (
    <div className="exercisePage">
      <BackView />
      <Header txt={sport} />
      {isFormShown ? exerciseForm : null}
      <div className="exercisePageContainer">
        <div className="sessionOrExercise">
          <p onClick={() => history.push(`/mySessions/${sport}`)}>
            My sessions
          </p>
          <p className="selectedLink">My exercises</p>
        </div>
        <div className="exercisesTilesContainer">{exercisesTiles}</div>
        <div>
          <div
            className="addExerciseButton"
            onClick={() => setIsFormShown(true)}
          >
            Add an exercise!
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
