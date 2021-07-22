import React, { useEffect, useState } from 'react';
import './BackView.css';
import Sport0 from '../img/sport0.jpeg';
import Sport1 from '../img/sport1.jpg';
import Sport2 from '../img/sport2.jpg';
import Sport3 from '../img/sport3.jpg';

export default function BackView() {
  const imageArray = [Sport0, Sport1, Sport2, Sport3];
  const [imageNumber, setImageNumber] = useState(null);
  useEffect(() => {
    setImageNumber(Math.floor(Math.random() * 4));
  }, []);
  return (
    <div
      className="backview"
      style={{ backgroundImage: `url(${imageArray[imageNumber]})` }}
    >
      <div className="overlay"></div>
    </div>
  );
}
