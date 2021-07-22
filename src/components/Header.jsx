import React from 'react';
import './Header.css';
import Logo from './Logo';

export default function Header(props) {
  const { txt } = props;

  return (
    <div>
      <div className="appHeader">
        <Logo size="small" />
        <h1>{txt}</h1>
      </div>
    </div>
  );
}
