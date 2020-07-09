import React from 'react';
import './Badge.scss';

export default function Badge({ color, onClick, active, id }) {
  return (
    <i
      onClick={() => {
        if (onClick) {
          onClick(id);
        }
      }}
      className={`badge badge--${color} ${active && 'active'}`}></i>
  );
}
