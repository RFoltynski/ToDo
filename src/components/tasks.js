import React from "react";
import { fbase } from "../fbase";
import "../css/tasks.css";
import { Jumbotron, Button, Form, Row } from "react-bootstrap";
import { throws } from "assert";

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      done: [],
      unDone: [],
      crossClick: false
    };
  }

  componentDidMount() {
    this.ref = fbase.syncState("tasks", {
      context: this,
      state: "tasks"
    });
    this.ref = fbase.syncState("done", {
      context: this,
      state: "done"
    });
    this.ref = fbase.syncState("unDone", {
      context: this,
      state: "unDone"
    });
  }

  componentWillUnmount() {
    fbase.removeBinding(this.ref);
  }

  doneTask = item => {
    let newTasks = this.state.tasks.filter(task => {
      return task.key !== item.key;
    });

    this.setState({
      done: [...this.state.done, item],
      tasks: newTasks
    });
  };

  unDoneTask = item => {
    event.preventDefault();
    let newTasks = this.state.tasks.filter(task => {
      return task.key !== item.key;
    });
    let itemWithReason = item;
    itemWithReason.reason = this.state.reason || " ";

    this.setState({
      unDone: [...this.state.unDone, itemWithReason],
      tasks: newTasks,
      reason: ""
    });
  };

  startFunctions = item => {
    event.preventDefault();
    this.doneTask(item);
  };

  handleChange = e => {
    this.setState({
      reason: e.target.value
    });
  };

  cleanTasks = () => {
    event.preventDefault();
    this.setState({
      tasks: []
    });
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
                    <TasksElements
                      doneTask={() => this.startFunctions(item)}
                      unDoneTask={() => this.unDoneTask(item)}
                      onChange={() => this.handleChange(event)}
                      crossClick={this.state.crossClick}
                      item={item}
                    />
                  );
                }
              })
            ) : (
              <p>
                ...sprawy, wymagają natychmiastowej uwagi. Są do zrobienia JUŻ.
                <br />
                np.: wykonanie telefonu.
              </p>
            )}
          </div>
          <div className="menu-tasks-column">
            <h2>Ważne</h2>
            {Array.isArray(this.state.tasks) ? (
              this.state.tasks.map(item => {
                if (item.status == 2) {
                  return (
                    <TasksElements
                      doneTask={() => this.startFunctions(item)}
                      unDoneTask={() => this.unDoneTask(item)}
                      onChange={() => this.handleChange(event)}
                      crossClick={this.state.crossClick}
                      item={item}
                    />
                  );
                }
              })
            ) : (
              <p>
                {" "}
                ...zadania nie koniecznie są pilne, lecz ich zaniedbywanie
                oddala od wyznaczonych celów. <br /> np.: nauka nowego języka.
              </p>
            )}
          </div>
          <div className="menu-tasks-column">
            <h2>Odłożone</h2>
            {Array.isArray(this.state.tasks) ? (
              this.state.tasks.map(item => {
                if (item.status == 3) {
                  return (
                    <TasksElements
                      doneTask={() => this.startFunctions(item)}
                      unDoneTask={() => this.unDoneTask(item)}
                      onChange={() => this.handleChange(event)}
                      crossClick={this.state.crossClick}
                      item={item}
                    />
                  );
                }
              })
            ) : (
              <p>
                ...sprawy, zuzywają energię, więc nie warto ich trzymać w
                głowie.
                <br />
                np.: wyjazd do Australii.
              </p>
            )}
          </div>
          <button className="clean-tasks" onClick={this.cleanTasks}>
            Wyczyść listę zadań
          </button>
        </div>
      </div>
    );
  }
}

export default Tasks;

class TasksElements extends React.Component {
  constructor() {
    super();
    this.state = {
      crossClick: false
    };
  }

  startFunctions = () => {
    this.props.unDoneTask();
    this.crossClick();
  };

  crossClick = () => {
    event.preventDefault();
    this.setState({
      crossClick: !this.state.crossClick
    });
  };

  render() {
    let boxClass = ["tasks-button-cross"];
    if (this.state.crossClick) {
      boxClass.push("tasks-button-cross-on");
    }

    return (
      <div>
        <div className="menu-tasks-task">
          {this.props.item.piorty + ". " + this.props.item.description}
          <button
            className="menu-tasks-button cross"
            onClick={() => this.crossClick()}
          >
            {" "}
            <img className="menu-tasks-button-img" src="/img/cross.png" />
          </button>
          <div />
          <button
            className="menu-tasks-button tick"
            onClick={this.props.doneTask}
          >
            <img className="menu-tasks-button-img" src="/img/tick.png" />
          </button>
        </div>
        <div className={boxClass.join(" ")}>
          <Form.Control
            as="textarea"
            onChange={this.props.onChange}
            placeholder="Jaka była przyczyna nie wykonania tego zadania?"
            rows="2"
          />
          <button
            className="menu-form-buttons-mark"
            onClick={this.startFunctions}
          >
            Oznacz jako "NIEWYKONANE"
          </button>
        </div>
      </div>
    );
  }
}
