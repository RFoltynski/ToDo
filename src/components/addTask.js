import React from "react";
import "../css/addTask.css";
import { Jumbotron, Button, Form, Row } from "react-bootstrap";
import { fbase } from "../fbase";

class AddTask extends React.Component {
  constructor() {
    super();
    this.state = {
      task: {
        piorty: "1",
        description: "",
        status: "1",
        key: Math.floor(Math.random() * 1000 + 1) + 1
      },
      validation: false,
      tasks: []
    };
  }

  handleChange = e => {
    this.setState({
      task: {
        ...this.state.task,
        description: e.target.value
      }
    });
  };

  setPriority = e => {
    this.setState({
      task: {
        ...this.state.task,
        piorty: e.target.value
      }
    });
  };

  setStatus = e => {
    this.setState({
      task: {
        ...this.state.task,
        status: e.target.value
      }
    });
  };

  componentDidMount() {
    this.ref = fbase.syncState("tasks", {
      context: this,
      state: "tasks"
    });
  }

  componentWillUnmount() {
    fbase.removeBinding(this.ref);
  }

  setTask = e => {
    if (this.state.task.description.length === 0) {
      this.setState({
        validation: true
      });
      return;
    }
    let newTasks = [...this.state.tasks];
    let newTask = { ...this.state.task };

    newTasks.push(newTask);
    newTasks.sort((a, b) => a.piorty.localeCompare(b.piorty));

    console.log(newTasks);

    this.setState({
      tasks: newTasks,
      validation: false
    });

    this.setState({
      task: {
        description: "",
        key: this.state.task.key + 10,
        status: this.state.task.status,
        piorty: this.state.task.piorty
      }
    });
  };

  startFunctions = () => {
    event.preventDefault();
    this.setTask();
  };

  render() {
    let validation = ["add-tasks-validation"];
    if (this.state.validation) {
      validation.push("add-tasks-validation-on");
    }
    return (
      <div className="container-fluid">
        <Form.Group
          className="col-md-11 mx-auto "
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>
            <div className="menu-form-heading ">
              <h2>Zadanie</h2>
            </div>
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Jeżeli zrobienie Twojego zadania zajmuje mniej niż dwie minuty nie zapisuj tego. Zrób to od razu!"
            rows="3"
            value={this.state.task.description}
            onChange={this.handleChange}
          />
          <div className={validation.join(" ")}>Dodaj treść zadania.</div>
        </Form.Group>

        <Form.Group className="col-md-11 mx-auto">
          <Form.Label>
            <div className="menu-form-heading ">
              <h2>Znaczenie</h2>
            </div>
          </Form.Label>
          <Form.Control
            as="select"
            value={this.state.value}
            onChange={this.setStatus}
          >
            <option value={1}>
              Pilne - kryzysy, sprawy naglące, zadania z deadlinem.
            </option>
            <option value={2}>
              Ważne - planowanie, szukanie nowych możliwości, aktywność
              fizyczna.
            </option>
            <option value={3}>
              Odłożone - sprawy, z którymi nie wiadomo jak zacząć.
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-md-11 mx-auto">
          <Form.Label>
            <div className="menu-form-heading ">
              <h2>Piorytet</h2>
            </div>
          </Form.Label>
          <Form.Control
            as="select"
            value={this.state.value}
            onChange={this.setPriority}
          >
            <option value={1}>1 - bardzo istotne</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5 - mało istotne</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-md-11 mx-auto">
          <Form.Label />

          <button
            className={"menu-form-buttons-addTask"}
            onClick={this.startFunctions}
          >
            <h3>Dodaj</h3>
          </button>
        </Form.Group>
      </div>
    );
  }
}

export default AddTask;
