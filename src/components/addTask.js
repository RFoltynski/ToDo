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
        key: 0
      },

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
    fbase.syncState("tasks", {
      context: this,
      state: "tasks"
    });
  }

  setTask = e => {
    let newTasks = [...this.state.tasks];
    let newTask = { ...this.state.task };

    newTasks.push(newTask);

    this.setState({
      tasks: [...this.state.tasks, newTask]
    });

    this.setState({
      task: {
        description: "",
        key: this.state.task.key + 1,
        status: this.state.task.status,
        piorty: this.state.task.piorty
      }
    });
  };

  startFunctions = () => {
    this.setTask();
  };

  render() {
    return (
      <div className="menu container-fluid">
        <Form.Group
          className="col-md-11 mx-auto "
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>
            <div className="menu-form-heading ">
              <h2>Zadanie</h2> <button className="menu-form-info">i </button>
            </div>
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Jeżeli zrobienie Twojego zadania zajmuje mniej niż dwie minuty nie zapisuj tego. Zrób to od razu!"
            rows="3"
            value={this.state.task.description}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="col-md-11 mx-auto">
          <Form.Label>
            <div className="menu-form-heading ">
              <h2>Znaczenie</h2> <button className="menu-form-info">i </button>
            </div>
          </Form.Label>
          <Form.Control
            as="select"
            value={this.state.value}
            onChange={this.setStatus}
          >
            <option value={1}>
              Pilne - "wykonaj telefon do...", "ćwicz przez 15 minut".
            </option>
            <option value={2}>
              Ważne - "chce zdrowo się odżywiać", "chcę nauczyć się... "
            </option>
            <option value={3}>
              Otwarte pętle - "chciałbym polecieć do Australii", "chciałbym
              porozmawiać z..".
            </option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-md-11 mx-auto">
          <Form.Label>
            <div className="menu-form-heading ">
              <h2>Piorytet</h2> <button className="menu-form-info">i </button>
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

          <Button variant="success" onClick={this.startFunctions}>
            <h3>Dodaj</h3>
          </Button>
        </Form.Group>
      </div>
    );
  }
}

export default AddTask;
