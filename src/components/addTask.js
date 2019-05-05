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
    let newTasks = [...this.state.tasks];
    let newTask = { ...this.state.task };

    newTasks.push(newTask);
    newTasks.sort((a, b) => a.piorty.localeCompare(b.piorty));

    console.log(newTasks);

    this.setState({
      tasks: newTasks
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
