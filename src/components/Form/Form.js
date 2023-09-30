import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './Form.css';

const Form = (props) => {
  const charts = ['work', 'study', 'entartainment', 'family'];
  const [valid, setValid] = useState(false);
  const [chosenCharts, setChosenCharts] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskBody, setTaskBody] = useState('');

  const taskTitleHandler = (e) => {
    setTaskTitle(e.target.value);
  };
  const taskBodyHandler = (e) => {
    setTaskBody(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const obj = {
      title: taskTitle,
      body: taskBody,
      charts: chosenCharts,
      confirmed: false,
      id: nanoid(),
    };
    props.onAddTask(obj);
    props.disableForm();
  };

  const selectChart = (chart) => {
    setChosenCharts((prevValue) => {
      let valid = true;
      for (let i of prevValue) {
        if (i === chart) {
          valid = false;
        }
      }
      if (valid) {
        return [...prevValue, chart];
      } else {
        return prevValue.filter((element) => element !== chart);
      }
    });
  };

  const chartsUI = charts.map((element) => {
    return (
      <div
        className={chosenCharts.includes(element) ? 'chart chosen' : 'chart'}
        key={element}
        onClick={() => {
          selectChart(element);
        }}
      >
        <span>{element}</span>
      </div>
    );
  });

  useEffect(() => {
    if (taskTitle.trim() !== '' && taskBody.trim() !== '') {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [taskTitle, taskBody]);

  return (
    <div className="modal">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="todoTitle">Task Title</label>
          <input
            onChange={taskTitleHandler}
            value={taskTitle}
            type="text"
            id="todoTitle"
          />
        </div>
        <div className="form-group">
          <label htmlFor="todo">Task</label>
          <textarea
            id="todo"
            onChange={taskBodyHandler}
            value={taskBody}
            row={10}
            column={5}
          />
        </div>
        <div className="charts">{chartsUI}</div>
        <div className="button-set">
          <button disabled={valid ? false : true} type="submit">
            Submit
          </button>
          <button type="button" onClick={props.disableForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
