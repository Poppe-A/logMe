import React, { useEffect, useState } from 'react';
import './Session.css';
export default function Session({ session, displaySport }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const dateToFormat = new Date(session.date);
    setDate(dateToFormat.toLocaleDateString());
  }, []);

  const detail = session.sessionExercise.map((elm, index) => (
    <div key={index} className="sessionDetailExercise">
      <p>{elm.name}</p>
      <div>
        <div>{elm.score.length ? elm.score.join(' - ') : elm.score[0]}</div>
      </div>
    </div>
  ));

  return (
    <div className="session">
      <div className="sessionTile" onClick={() => setOpen(!open)}>
        <p>
          {displaySport ? `${session.sport} : ` : null}

          {session.name}
        </p>
        <p>{date || null}</p>
      </div>
      <div className={`sessionDetail detail-${open ? 'open' : 'close'}`}>
        {detail}
      </div>
    </div>
  );
}
