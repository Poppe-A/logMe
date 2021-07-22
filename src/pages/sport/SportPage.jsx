import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BackView from '../../components/BackView';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SportService from '../../services/SportService';
import CloseImage from '../../img/close.png';
import './SportPage.css';

export default function SportPage() {
  const [sports, setSports] = useState([]);
  const [newSport, setNewSport] = useState('');
  const [isFormShown, setIsFormShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    SportService.getSports().then((res) => {
      setSports(res.data);
    });
  }, [isFormShown]);

  const validForm = (e) => {
    e.preventDefault();
    console.log(sports);
    const sportExist = sports.find((elm) => elm.name === newSport);

    if (!sportExist) {
      SportService.addSport(newSport);
      setIsFormShown(false);
    } else {
      setErrorMessage('This sport already exists');
      setTimeout(() => setErrorMessage(''), 2000);
    }
  };

  let sportsTiles = sports.map((sport, index) => (
    <div
      key={index}
      className="sportTile"
      onClick={() => history.push(`/mySessions/${sport.name}`)}
    >
      {sport.name.toUpperCase()}
    </div>
  ));
  if (!sports.length) {
    sportsTiles = 'No sports found with your account';
  }

  const sportForm = (
    <div className="sportForm">
      <form className="sportFormContent" onSubmit={validForm}>
        <h3>NEW SPORT</h3>
        <img
          src={CloseImage}
          alt="Close"
          onClick={() => setIsFormShown(false)}
        />
        <input
          placeholder="Sport name"
          onChange={(e) => setNewSport(e.target.value)}
          required
        />

        <p className="errorMessage">{errorMessage}</p>
        <input className="submitButton" type="submit" value="Add sport"></input>
      </form>
    </div>
  );

  return (
    <div className="sportPage">
      <BackView />
      <Header txt="My Sports" />
      {isFormShown ? sportForm : null}
      <div className="sportPageContainer">
        <div className="sportTilesContainer">{sportsTiles}</div>

        <div className="addSportButton" onClick={() => setIsFormShown(true)}>
          ADD A SPORT !
        </div>
      </div>

      <Footer />
    </div>
  );
}
