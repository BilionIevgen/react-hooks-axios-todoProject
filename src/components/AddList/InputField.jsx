import React, { useState } from 'react';
import Badge from '../Badge';
import close from '../../assets/img/close.svg';

export default function InputField({ colors, setShowPopup, setItems }) {
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');
  const onInputValue = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="add-list__popup">
      <img
        onClick={() => {
          setShowPopup(false);
        }}
        className="close"
        src={close}
        alt="close"
      />

      <input onChange={(e) => onInputValue(e)} className="field" type="text" value={inputValue} />

      <ul>
        {colors.map((el, i) => {
          return (
            <li key={el.id}>
              <Badge
                active={el.id === selectedColor}
                onClick={() => {
                  setSelectedColor(el.id);
                }}
                color={el.name}
                id={el.id}
              />
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          setItems(selectedColor, inputValue);
        }}>
        Добавить
      </button>
    </div>
  );
}
