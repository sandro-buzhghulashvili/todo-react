import React, { useState } from 'react';
import Edit from '../Edit/Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { nanoid } from 'nanoid';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './Task.css';

const Task = (props) => {
  const [editing, setEditing] = useState(false);

  const confirmTask = (e) => {
    if (e.target.checked) {
      props.onConfirm(props.id);
    } else {
      props.onUnconfirm(props.id);
    }
  };

  const deleteTask = () => {
    props.onDeleteTask(props.id);
  };

  const editTask = () => {
    setEditing((prevValue) => !prevValue);
  };

  const saveUpdatedTask = (task) => {
    props.onEditTask(task);
  };

  return (
    <div className="card">
      {editing ? (
        <Edit
          onStopEditing={editTask}
          id={props.id}
          title={props.title}
          body={props.body}
          charts={props.charts}
          onSaveUpdatedTask={saveUpdatedTask}
        />
      ) : (
        <>
          <span className="menu">
            <FontAwesomeIcon icon={faEllipsis} className="icon" />
            <ul>
              <li>
                <button onClick={editTask}>Edit ...</button>
              </li>
              <li>
                <button onClick={deleteTask}>Delete</button>
              </li>
            </ul>
          </span>
          <h1 className={props.confirmed ? 'confirmed' : ''}>{props.title}</h1>
          <p className={props.confirmed ? 'confirmed' : ''}>{props.body}</p>
          <div className="card-footer">
            {props.charts && props.charts.length > 0 && (
              <div className="charts">
                {props.charts.map((element) => {
                  if (element === 'work') {
                    return <div key={nanoid()} className="circle purple"></div>;
                  } else if (element === 'study') {
                    return <div key={nanoid()} className="circle aqua"></div>;
                  } else if (element === 'entartainment') {
                    return <div key={nanoid()} className="circle pink"></div>;
                  } else {
                    return <div key={nanoid()} className="circle green"></div>;
                  }
                })}
              </div>
            )}
            <div className="confirm">
              <input
                type="checkbox"
                checked={props.confirmed ? true : false}
                onChange={confirmTask}
              />
              <label>Done</label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
