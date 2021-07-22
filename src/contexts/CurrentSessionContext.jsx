import React, { createContext, useState } from 'react';

export const SessionContext = createContext(null);

// eslint-disable-next-line react/prop-types
function SeshContext({ children }) {
  const [currentSession, setCurrentSession] = useState(false);
  const [sessionName, setSessionName] = useState(null);
  const [sessionSport, setSessionSport] = useState(null);
  const [sessionExercises, setSessionExercises] = useState([]);

  const resetSession = () => {
    setCurrentSession(false);
    setSessionName(null);
    setSessionSport(null);
    setSessionExercises([]);
  };

  return (
    <SessionContext.Provider
      value={{
        currentSession,
        setCurrentSession,
        sessionName,
        setSessionName,
        sessionSport,
        setSessionSport,
        sessionExercises,
        setSessionExercises,
        resetSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
export default SeshContext;
