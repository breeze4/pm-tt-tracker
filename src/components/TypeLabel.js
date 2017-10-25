import React from 'react';

import config from '../Config.js';
const { refData } = config;
const TYPES_DATA = refData.types;

const TypeLabel = ({ classes, type }) => {
  const typeLabels = type.map((t) => {
    const typeData = TYPES_DATA[t];
    return (
      <span key={t} className="type-label" style={{ backgroundColor: typeData.color }}>
        {typeData.name}
      </span>
    );
  });

  const mergedClasses = ['type-label-container'].concat(classes);

  return (
    <div className={mergedClasses.join(' ')}>
      { typeLabels }
    </div>
  );
};

export default TypeLabel;