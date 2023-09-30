import React, { useState, useEffect } from 'react';
import Illustration from '../../assets/imgs/ill.png';
import './Sidebar.css';

const Sidebar = (props) => {
  const filterOptions = ['work', 'study', 'entartainment', 'family'];
  const [chosenCategoryFilters, setChosenCategoryFilters] = useState([]);

  const filterCategory = (category) => {
    if (!chosenCategoryFilters.includes(category)) {
      setChosenCategoryFilters((prevValue) => {
        return [...prevValue, category];
      });
    } else {
      setChosenCategoryFilters((prevValue) => {
        return prevValue.filter((element) => element !== category);
      });
    }
  };

  const filterOptionsUI = filterOptions.map((element) => {
    return (
      <div
        onClick={() => {
          filterCategory(element);
        }}
        key={element}
        className="filter-bar"
      >
        <div
          className={`circle ${
            element === 'work'
              ? 'purple'
              : element === 'study'
              ? 'aqua'
              : element === 'entartainment'
              ? 'pink'
              : 'green'
          }`}
        ></div>
        <p>{element}</p>
        <div
          className={`chosen-filter ${
            chosenCategoryFilters.includes(element) && 'visible'
          }`}
        ></div>
      </div>
    );
  });

  const checkboxHandler = (e) => {
    props.onHideDoneTasks(e.target.checked);
  };

  useEffect(() => {
    props.onFilterTasks(chosenCategoryFilters);
  }, [chosenCategoryFilters]);
  return (
    <div className="sidebar">
      {filterOptionsUI}
      <div className="hide-done-tasks">
        <input type="checkbox" id="hideDoneTasks" onChange={checkboxHandler} />
        <label htmlFor="hideDoneTasks">Hide Done Tasks</label>
      </div>
      <div className="illustration">
        <img src={Illustration} alt="illustration" />
      </div>
    </div>
  );
};

export default Sidebar;
