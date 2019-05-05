import React, { Component } from "react";
import "./App.css";
import { Jumbotron, Button, Form, Row } from "react-bootstrap";
import { fbase } from "./fbase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: {
        piorty: "1",
        description: "",
        status: "1",
        key: 0
      },

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

  madeTask = task => {
    if (task.status == 1) {
      let newPressingList = (this.state.tasks.pressing || []).filter(item => {
        return item.key !== task.key;
      });

      this.setState({
        tasks: {
          important: this.state.tasks.important,
          pressing: newPressingList,
          openLoops: this.state.tasks.openLoops
        }
      });
    } else if (task.status == 2) {
      let newImportantList = (this.state.tasks.important || []).filter(item => {
        return item.key !== task.key;
      });

      this.setState({
        tasks: {
          important: newImportantList,
          pressing: this.state.tasks.pressing,
          openLoops: this.state.tasks.openLoops
        }
      });
    } else if (task.status == 3) {
      let newOpenLoops = (this.state.tasks.openLoops || []).filter(item => {
        return item.key !== task.key;
      });

      this.setState({
        tasks: {
          important: this.state.tasks.important,
          pressing: this.state.tasks.pressing,
          openLoops: newOpenLoops
        }
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="menu ">
          <center>
            <h1>Rzeczy do zrobienia</h1>
            <p>
              Wszystkie sprawy o których, myślisz zużywają Towją energię, więc
              nie ma sensu trzymać ich w głowie. Zanotuj je!
            </p>
          </center>

          <Form className="menu-form">
            <Form.Group
              className="col-md-12"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <h2>Krok 1. Zadanie do wykonania.</h2>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Jeżeli zrobienie Twojego zadania zajmuje mniej niż dwie minuty nie zapisuj tego. Zrób to od razu!"
                rows="3"
                value={this.state.task.description}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="col-md-12">
              <Form.Label>
                <h2>Krok 2. Określ charakter Twojego zadania. </h2>
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

            <Form.Group className="col-md-12">
              <Form.Label>
                <h2>Krok 3. Ustaw piorytet</h2>
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

            <Form.Group className="col-md-12">
              <Form.Label>
                <h2>Krok 4. Dodaj Zadanie</h2>
              </Form.Label>
              <div>
                <Button
                  className="col-md-12"
                  variant="light"
                  onClick={this.startFunctions}
                >
                  Dodaj zadanie
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>

        <div className="app-tasks ">
          <h1>Lista Zadań</h1>
          <Row className="container-fluid">
            <div className="col-md-4">
              <h2>Pilne</h2>
              {(this.state.tasks.pressing || []).map(item => {
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
                        <Button onClick={() => this.madeTask(item)}>
                          Zrobione
                        </Button>
                        <Button>Nie zrobione</Button>
                      </div>
                    </Row>
                  </div>
                );
              })}
            </div>
            <div className="col-md-4">
              <h2>Ważne</h2>
              {(this.state.tasks.important || []).map(item => {
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
                        <Button onClick={() => this.madeTask(item)}>
                          Zrobione
                        </Button>
                        <Button>Nie zrobione</Button>
                      </div>
                    </Row>
                  </div>
                );
              })}
            </div>

            <div className="col-md-4">
              {" "}
              <h2>Otwarte Pętle</h2>
              {(this.state.tasks.openLoops || []).map(item => {
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
                        <Button onClick={() => this.madeTask(item)}>
                          Zrobione
                        </Button>
                        <Button>Nie zrobione</Button>
                      </div>
                    </Row>
                  </div>
                );
              })}
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
