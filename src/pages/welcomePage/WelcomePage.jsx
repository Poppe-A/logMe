import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import LogService from '../../services/LogService';

import './WelcomePage.css';
import BackView from '../../components/BackView';
import Footer from '../../components/Footer';

export default function WelcomePage() {
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
      <h2>Welcome back {username}</h2>
      <Footer />
    </div>
  );
}
