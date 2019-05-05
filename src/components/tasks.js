import React from "react";
import { fbase } from "../fbase";
import "../css/tasks.css";
import { Button } from "react-bootstrap";

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.ref = fbase.syncState("tasks", {
      context: this,
      state: "tasks"
    });
  }
  componentWillUnmount() {
    fbase.removeBinding(this.ref);
  }

  madeTask = item => {
    let newTasks = this.state.tasks.filter(task => {
      return task.key !== item.key;
    });

    this.setState({
      tasks: newTasks
    });
  };

  startFunctions = item => {
    event.preventDefault();
    this.madeTask(item);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row menu-tasks">
          <div className="menu-tasks-column">
            <h2>Pilne</h2>
            {Array.isArray(this.state.tasks) ? (
              this.state.tasks.map(item => {
                if (item.status == 1) {
                  return (
                    <div className="menu-tasks-task">
                      {item.description}
                      <button className="menu-tasks-button cross">
                        {" "}
                        <img
                          className="menu-tasks-button-img"
                          src="/img/cross.png"
                        />
                      </button>
                      <button
                        className="menu-tasks-button tick"
                        onClick={() => this.startFunctions(item)}
                      >
                        <img
                          className="menu-tasks-button-img"
                          src="/img/tick.png"
                        />
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <p> Nie masz żadnych pilnych spraw!</p>
            )}
          </div>
          <div className="menu-tasks-column">
            <h2>Ważne</h2>
            {Array.isArray(this.state.tasks) ? (
              this.state.tasks.map((item, i) => {
                if (item.status == 2) {
                  return (
                    <div className="menu-tasks-task">
                      {item.description}
                      <button className="menu-tasks-button cross">
                        {" "}
                        <img
                          className="menu-tasks-button-img"
                          src="/img/cross.png"
                        />
                      </button>
                      <button
                        className="menu-tasks-button tick"
                        onClick={() => this.startFunctions(item)}
                      >
                        <img
                          className="menu-tasks-button-img"
                          src="/img/tick.png"
                        />
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <p> Nie masz żadnych ważnych spraw!</p>
            )}
          </div>
          <div className="menu-tasks-column">
            <h2>Otwarte Pętle</h2>
            {Array.isArray(this.state.tasks) ? (
              this.state.tasks.map((item, i) => {
                if (item.status == 3) {
                  return (
                    <div className="menu-tasks-task">
                      {item.description}
                      <button className="menu-tasks-button cross">
                        {" "}
                        <img
                          className="menu-tasks-button-img"
                          src="/img/cross.png"
                        />
                      </button>
                      <button
                        className="menu-tasks-button tick"
                        onClick={() => this.startFunctions(item)}
                      >
                        {" "}
                        <img
                          className="menu-tasks-button-img"
                          src="/img/tick.png"
                        />
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <p> Nie masz żadnych niepodjętych spraw!</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
