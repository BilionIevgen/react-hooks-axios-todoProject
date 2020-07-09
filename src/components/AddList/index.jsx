import React, { useState } from 'react';
import List from '../List';
import './AddList.scss';
import InputField from './InputField';

export default function AddList(props) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="add-list">
      <List
        onClick={() => {
          setShowPopup(true);
        }}
        items={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                className="list__icon-plus"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список',
          },
        ]}
      />
      {showPopup && (
        <InputField setItems={props.setItems} setShowPopup={setShowPopup} colors={props.colors} />
      )}
    </div>
  );
}
