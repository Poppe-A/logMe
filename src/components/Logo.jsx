import React from 'react';
import './Logo.css';

export default function Logo({ size }) {
  return (
    <div className={`logo ${size === 'large' ? 'largeLogo' : 'smallLogo'}`}>
      <p className="logo1">LOG</p>
      <p className="logo2">ME</p>
    </div>
  );
}
