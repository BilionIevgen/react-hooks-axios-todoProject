import React, { useState, useEffect } from 'react';
import list from './assets/img/list.svg';
import { List, AddList, Tasks } from './components';
import axios from 'axios';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [taskID, setTaskID] = useState(0);
  const [activeItem, setActiveItem] = useState(null);
  const [allTasksActive, setAllTaskActive] = useState(true);

  const getLists = () => {
    axios
      .get('http://localhost:4001/lists?_expand=color&_embed=tasks')
      .then((res) => res.data)
      .then((res) => {
        setLists(res);
      });
  };

  const getColors = () => {
    axios
      .get('http://localhost:4001/colors')
      .then((res) => res.data)
      .then((res) => {
        setColors(res);
      });
  };

  useEffect(() => {
    getLists();
    getColors();
  }, []);

  const onSetItems = (obj) => {
    setLists((lists) => [...lists, obj]);
  };

  const deleteItems = (id) => {
    axios.delete(`http://localhost:4001/lists/${id}`).then((res) => {
      if (res.statusText === 'OK') {
        getLists();
      }
    });
  };

  const selectTask = (item) => {
    setTaskID(item.id - 1);
    setActiveItem(item);
  };

  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          name: title,
        };
      }
      return item;
    });
    setLists(newList);
  };

  const onAddTask = (id, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          tasks: [...item.tasks, taskObj],
        };
      }
      return item;
    });
    setLists(newList);
  };

  return (
    <div className="App">
      <div className="todo">
        <div className="todo__sidebar">
          {lists ? (
            <>
              <List
                items={[
                  {
                    active: allTasksActive,
                    icon: <img src={list} alt="list" />,
                    name: 'Все задачи',
                  },
                ]}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                setAllTaskActive={setAllTaskActive}
              />
              <List
                activeItem={activeItem}
                selectTask={selectTask}
                deleteItems={deleteItems}
                setAllTaskActive={setAllTaskActive}
                items={lists}
                isRemovable={true}
              />
              <AddList setItems={onSetItems} colors={colors} />
            </>
          ) : (
            '...Loading'
          )}
        </div>
        <div className="todo__tasks">
          {lists && (
            <Tasks
              onAddTask={onAddTask}
              onEditTitle={onEditTitle}
              list={lists[taskID] && lists[taskID]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
