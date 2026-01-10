import React from 'react';

const HighlightCard = ({fed}) => {
  return (
    <div className="card card-dash bg-base-100  shadow-sm w-full h-[180px] ">
      <div className=" card-body">
        <h2 className="card-title">{fed.name}</h2>
        <p>{fed.description}</p>
      </div>
    </div>
  );
};

export default HighlightCard;