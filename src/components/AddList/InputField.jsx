import React, { useState, useEffect } from 'react';
import Badge from '../Badge';
import close from '../../assets/img/close.svg';
import axios from 'axios';

export default function InputField({ colors, setShowPopup, setItems }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onInputValue = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setSelectedColor(colors[0].id);
  }, [colors]);

  const buttonClick = () => {
    if (!inputValue) {
      alert('Введите название');
    } else {
      setIsLoading(true);
      axios
        .post('http://localhost:4001/lists?_expand=color', {
          name: inputValue,
          colorId: selectedColor,
        })
        .then((res) => {
          setItems({ ...res.data, color: colors.find((obj) => obj.id === res.data.colorId) });
        })
        .finally(() => {
          setIsLoading(false);
        });

      setInputValue('Введите название');
    }
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

      <input
        placeholder="название списка"
        onChange={(e) => onInputValue(e)}
        className="field"
        type="text"
        value={inputValue}
      />

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
        disabled={isLoading}
        style={{
          backgroundColor: isLoading && 'grey',
        }}
        onClick={() => {
          buttonClick();
        }}>
        Добавить
      </button>
    </div>
  );
}
