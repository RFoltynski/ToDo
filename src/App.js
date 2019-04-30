import React, { Component } from "react";
import "./App.css";
import { Jumbotron, Button, Form, Row } from "react-bootstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: { piorty: "1", description: "", status: "1" },

      tasks: { pressing: [], important: [], openLoops: [] }
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

  setTask = e => {
    if (this.state.task.status == 1) {
      let newPressing = [...this.state.tasks.pressing];
      let newTask = { ...this.state.task };

      newPressing.push(newTask);
      newPressing.sort((a, b) => a.piorty.localeCompare(b.piorty));

      this.setState({
        tasks: {
          important: this.state.tasks.important,
          pressing: newPressing,
          openLoops: this.state.tasks.openLoops
        }
      });
    } else if (this.state.task.status == 2) {
      let newImportant = [...this.state.tasks.important];
      let newTask = { ...this.state.task };

      newImportant.push(newTask);
      newImportant.sort((a, b) => a.piorty.localeCompare(b.piorty));

      this.setState({
        tasks: {
          important: newImportant,
          pressing: this.state.tasks.pressing,
          openLoops: this.state.tasks.openLoops
        }
      });
    } else if (this.state.task.status == 3) {
      let newOpenLoops = [...this.state.tasks.openLoops];
      let newTask = { ...this.state.task };

      newOpenLoops.push(newTask);
      newOpenLoops.sort((a, b) => a.piorty.localeCompare(b.piorty));

      this.setState({
        tasks: {
          important: this.state.tasks.important,
          pressing: this.state.tasks.pressing,
          openLoops: newOpenLoops
        }
      });
    }

    this.setState({
      task: { description: "" }
    });
  };

  startFunctions = () => {
    this.setTask();
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
                  <option value={3}>
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
            <Button variant="primary" onClick={this.startFunctions}>
              Dodaj zadanie
            </Button>
          </p>
        </Jumbotron>
        <Row className="container-fluid">
          <div className="col-md-4">
            <h3>Ważne</h3>
            {this.state.tasks.important.map(item => {
              return (
                <div>
                  <Row>
                    <div className="col-md-12">
                      {item.description + " " + item.piorty}
                    </div>
                  </Row>
                  <Row>
                    <div className="col-md-12">
                      {" "}
                      <Button>Zrobione</Button>
                      <Button>Nie zrobione</Button>
                    </div>
                  </Row>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h3>Pilne</h3>
            {this.state.tasks.pressing.map(item => {
              return (
                <div>
                  <Row>
                    <div className="col-md-12">
                      {item.description + " " + item.piorty}
                    </div>
                  </Row>
                  <Row>
                    <div className="col-md-12">
                      {" "}
                      <Button>Zrobione</Button>
                      <Button>Nie zrobione</Button>
                    </div>
                  </Row>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            {" "}
            <h3>Otwarte Pętle</h3>
            {this.state.tasks.openLoops.map(item => {
              return (
                <div>
                  <Row>
                    <div className="col-md-12">
                      {item.description + " " + item.piorty}
                    </div>
                  </Row>
                  <Row>
                    <div className="col-md-12">
                      {" "}
                      <Button>Zrobione</Button>
                      <Button>Nie zrobione</Button>
                    </div>
                  </Row>
                </div>
              );
            })}
          </div>
        </Row>
      </div>
    );
  }
}

export default App;
