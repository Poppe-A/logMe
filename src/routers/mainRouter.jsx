import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginContext } from '../contexts/LogContext';

import LogPage from '../pages/log/LogPage';
import SessionPage from '../pages/session/SessionPage';
import SportPage from '../pages/sport/SportPage';
import ExercisePage from '../pages/exercise/ExercisePage';
import WelcomePage from '../pages/welcomePage/WelcomePage';
import NewSession from '../pages/newSession/NewSession';

export default function MainRouter() {
  const { loginStatus } = useContext(LoginContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!loginStatus ? <LogPage /> : <WelcomePage />}
        </Route>
        <Route path="/sports">
          <SportPage />
        </Route>
        <Route path={`/mySessions/:sport`} component={SessionPage} />
        <Route path={`/myExercises/:sport`} component={ExercisePage} />
        <Route path="/newSession" component={NewSession}></Route>
      </Switch>
    </Router>
  );
}
