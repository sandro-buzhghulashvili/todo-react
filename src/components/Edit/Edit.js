import React, { useState, useEffect } from 'react';
import Styles from './Edit.module.css';

const Edit = (props) => {
  const charts = ['work', 'study', 'entartainment', 'family'];
  const [valid, setValid] = useState(false);
  const [chosenCharts, setChosenCharts] = useState(props.charts);
  const [taskTitle, setTaskTitle] = useState(props.title);
  const [taskBody, setTaskBody] = useState(props.body);

  const titleInputHandler = (e) => {
    setTaskTitle(e.target.value);
  };
  const bodyInputHandler = (e) => {
    setTaskBody(e.target.value);
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

  const updateTask = () => {
    const obj = {
      id: props.id,
      title: taskTitle,
      body: taskBody,
      charts: chosenCharts,
    };
    props.onSaveUpdatedTask(obj);
    props.onStopEditing();
  };

  const chartsUI = charts.map((element) => {
    return (
      <div
        className={
          chosenCharts.includes(element)
            ? `${Styles.chosen}`
            : `${Styles.chart}`
        }
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
    <div className={Styles.edit}>
      <div className={Styles['input-group']}>
        <label>Task title</label>
        <input onChange={titleInputHandler} type="text" value={taskTitle} />
      </div>
      <div className={Styles['input-group']}>
        <label>Task</label>
        <textarea
          onChange={bodyInputHandler}
          value={taskBody}
          rows="5"
          col="5"
          className={Styles.textarea}
        />
      </div>
      <div className={Styles.charts}>{chartsUI}</div>
      <div className={Styles.buttons}>
        <button disabled={valid ? false : true} onClick={updateTask}>
          Update
        </button>
        <button onClick={props.onStopEditing}>Cancel</button>
      </div>
    </div>
  );
};

export default Edit;
