import React, { Component } from 'react';

const frameStyle = {
  background: '#FBF9F0',
  minHeight: '50vh',
  opacity: '0.9',
  borderRadius: '10px',
  boxShadow: '5px 5px 5px #888888',
  paddingBottom: '3vh',
  color: 'rgba(144, 55, 55, 0.82)'
};

const Frame = function(props) {
  return (
      <div className="container">
           <div className="col-lg-10 col-lg-offset-1" style={frameStyle}>
             <h3 className="center">{props.title}</h3>
             {props.insideFrame}
           </div>
      </div>
  );
}

export default Frame;
