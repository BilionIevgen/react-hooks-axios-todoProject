import React, { useState } from 'react';
import list from './assets/img/list.svg';
import List from './components/List';
import AddList from './components/AddList';
import DB from './assets/db.json';

function App() {
  const [items, setItems] = useState(
    DB.lists.map((el) => {
      return { ...el, color: DB.colors.find((obj) => obj.id === el.colorId) };
    }),
  );

  const onSetItems = (id, value) => {
    setItems((items) => [
      ...items,
      {
        name: value,
        colorId: id,
        id: 1 + DB.lists[DB.lists.length - 1].id,
        color: DB.colors.find((obj) => obj.id === id),
      },
    ]);
  };

  const deleteItems = (id) => {
    setItems((items) =>
      items.filter((el) => {
        if (el.id === id) return false;
        return true;
      }),
    );
  };

  return (
    <div className="App">
      <div className="todo">
        <div className="todo__sidebar">
          <List items={[{ icon: <img src={list} alt="list" />, name: 'Все задачи' }]} />

          <List deleteItems={deleteItems} items={items} isRemovable={true} />

          <AddList setItems={onSetItems} colors={DB.colors} />
        </div>
        <div className="todo__tasks"></div>
      </div>
    </div>
  );
}

export default App;
