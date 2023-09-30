import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Form from './components/Form/Form';
import Task from './components/Task/Task';

const App = () => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  let filteredTasks = [];
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [displayForm, setDisplayForm] = useState(false);

  const displayOrDisableForm = () => {
    setDisplayForm((prevValue) => !prevValue);
  };

  const updateConfirmedTasks = (taskId) => {
    setTasks(
      tasks.map((element) => {
        if (element.id === taskId) {
          return {
            ...element,
            confirmed: true,
          };
        } else {
          return element;
        }
      })
    );
  };

  const editTask = (task) => {
    setTasks(
      tasks.map((element) => {
        if (element.id === task.id) {
          return {
            ...element,
            title: task.title,
            body: task.body,
            charts: task.charts,
          };
        } else {
          return element;
        }
      })
    );
  };

  const deleteFromConfirmedTasks = (taskId) => {
    setTasks(
      tasks.map((element) => {
        if (element.id === taskId) {
          return {
            ...element,
            confirmed: false,
          };
        } else {
          return element;
        }
      })
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((element) => element.id !== taskId));
  };

  const addTask = (task) => {
    setTasks((prevValue) => [...prevValue, task]);
  };

  let allTasks = tasks.map((element) => {
    return (
      <Task
        id={element.id}
        key={element.id}
        title={element.title}
        body={element.body}
        charts={element.charts}
        confirmed={element.confirmed}
        onConfirm={updateConfirmedTasks}
        onUnconfirm={deleteFromConfirmedTasks}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
      />
    );
  });

  if (searchTerms.length > 0) {
    filteredTasks = tasks.filter((element) => {
      let valid = false;
      for (let i of searchTerms) {
        if (element.charts.includes(i)) {
          valid = true;
        }
      }
      if (valid) {
        return element;
      }
    });
    allTasks = filteredTasks.map((element) => {
      return (
        <Task
          id={element.id}
          key={element.id}
          title={element.title}
          body={element.body}
          charts={element.charts}
          confirmed={element.confirmed}
          onConfirm={updateConfirmedTasks}
          onUnconfirm={deleteFromConfirmedTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      );
    });
  }

  const filterTasks = (categories) => {
    if (tasks.length > 0) {
      setSearchTerms(categories);
    }
  };

  const hideOrShowDoneTasks = (x) => {
    setHideDoneTasks(x);
  };

  if (hideDoneTasks) {
    filteredTasks = tasks.filter((element) => {
      if (!element.confirmed) {
        return element;
      }
    });
    allTasks = filteredTasks.map((element) => {
      return (
        <Task
          id={element.id}
          key={element.id}
          title={element.title}
          body={element.body}
          charts={element.charts}
          confirmed={element.confirmed}
          onConfirm={updateConfirmedTasks}
          onUnconfirm={deleteFromConfirmedTasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />
      );
    });
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      <Navbar displayForm={displayOrDisableForm} />
      {displayForm &&
        ReactDOM.createPortal(
          <Form disableForm={displayOrDisableForm} onAddTask={addTask} />,
          document.getElementById('form-modal')
        )}
      <div className="container">
        <Sidebar
          onFilterTasks={filterTasks}
          onHideDoneTasks={hideOrShowDoneTasks}
        />
        {tasks.length > 0 ? (
          <div className="tasks">{allTasks}</div>
        ) : (
          <h1 className="no-tasks">No tasks, maybe add one ?</h1>
        )}
        {filteredTasks.length === 0 &&
          tasks.length !== 0 &&
          searchTerms.length > 0 && (
            <h1 className="no-tasks">Found no tasks with given categories</h1>
          )}
      </div>
    </>
  );
};

export default App;
