import React from 'react';

import '../components.css';

export const Card = ({ children }) => {
  return (
    <div className="card-inner">
      {children}
    </div>
  );
}

export const CardSection = ({ children }) => {
  return (
    <div className="card-section">
      {children}
    </div>
  );
}
