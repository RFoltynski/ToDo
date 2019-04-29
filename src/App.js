import React, { Component } from "react";
import "./App.css";
import { Jumbotron, Button, Form } from "react-bootstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: { piorty: 0, description: "", status: 0 },
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

  setTask = e => {
    let newTasks = [...this.state.tasks];
    let newTask = { ...this.state.task };

    newTasks.push(newTask);
    newTasks.sort((a, b) => a.piorty.localeCompare(b.piorty));

    this.setState({
      tasks: newTasks
    });

    this.setState({
      task: { piorty: 0, description: "" },
      setPiorty: false
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

  render() {
    return (
      <div className="App">
        <Jumbotron>
          <h1>Rzeczy do zrobienia</h1>
          <p>Prosta aplikacja służąca do organizacji zadań do wykonania.</p>
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Czynność do wykonania</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Jeżeli zrobienie Twojego zadania zajmuje mniej niż dwie minuty nie zapisuj tego. Zrób to od razu!"
                  rows="3"
                  value={this.state.task.description}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Określ charakter Twojego zadania</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.value}
                  onChange={this.setStatus}
                >
                  <option value={1}>
                    Pilne - sprawy konieczne do wykonania jak najszybciej, ale
                    nie wpływające na Twoje cele w długim okresie.
                  </option>
                  <option value={2}>
                    Ważne - sprawy, które nie są naglące, lecz ich odkładanie
                    oddla cię od wyznaczonych celów.
                  </option>
                  <option value={2}>
                    Otwarte pętle - sprawy z którymi niewiele da się zrobić, ale
                    zaprzątają Ci głowę.
                  </option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Ustaw piorytet</Form.Label>
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
            </Form.Group>
          </Form>
          <p>
            <Button variant="primary" onClick={this.setTask}>
              Dodaj zadanie
            </Button>
          </p>
        </Jumbotron>
        <div>
          {this.state.tasks.map((task, i) => {
            return (
              <div>
                <span>{task.piorty}</span>
                <span>{task.description}</span>
                <Button> Zrobione </Button> <Button> Nie zrobione</Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
