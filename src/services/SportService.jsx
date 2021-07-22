import Axios from 'axios';

const SportService = {
  getSports() {
    return Axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:4000/sport/getUserSports',
    });
  },

  getSessions(sport) {
    return Axios.get(
      `http://localhost:4000/sport/getSportSessions?sport=${sport}`,
      {
        withCredentials: true,
      }
    );
  },

  getExercises(sport) {
    return Axios.get(
      `http://localhost:4000/sport/getSportExercises?sport=${sport}`,
      {
        withCredentials: true,
      }
    );
  },

  addSport(sport) {
    return Axios(`http://localhost:4000/sport/addSport?sport=${sport}`, {
      method: 'post',
      withCredentials: true,
    });
  },

  addExercise(exercise) {
    return Axios(`http://localhost:4000/sport/addExercise`, {
      method: 'post',
      data: { exercise },
      withCredentials: true,
    });
  },

  finishSession(session) {
    return Axios(`http://localhost:4000/sport/finishSession`, {
      method: 'post',
      data: { session },
      withCredentials: true,
    });
  },
};

export default SportService;
