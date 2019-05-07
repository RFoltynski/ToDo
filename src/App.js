import React, { Component } from "react";
import "./App.css";
import { Jumbotron, Button, Form, Row } from "react-bootstrap";
import { fbase } from "./fbase";
import AddTask from "./components/addTask";
import Tasks from "./components/tasks";
import Summary from "./components/summary";

class App extends Component {
  constructor() {
    super();
    this.state = {
      render: "",
      buttonPressed: false,
      buttonPressed1: true,
      buttonPressed2: false,
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

  handleClick = (compName, e) => {
    this.setState({
      render: compName
    });
  };

  _renderSubComp() {
    switch (this.state.render) {
      case "AddTask":
        return <AddTask />;
      case "Tasks":
        return <Tasks />;
      case "Summary":
        return <Summary />;
    }
  }

  onClick = event => {
    event.preventDefault();
    this.handleClick("AddTask");
    (this.buttonPress = () => {
      this.setState({
        buttonPressed: true,
        buttonPressed1: false,
        buttonPressed2: false
      });
    })();
  };
  onClick1 = event => {
    event.preventDefault();
    this.handleClick("Tasks");
    (this.buttonPress1 = () => {
      this.setState({
        buttonPressed: false,
        buttonPressed1: true,
        buttonPressed2: false
      });
    })();
  };
  onClick2 = event => {
    event.preventDefault();
    this.handleClick("Summary");
    (this.buttonPress2 = () => {
      this.setState({
        buttonPressed: false,
        buttonPressed1: false,
        buttonPressed2: true
      });
    })();
  };

  render() {
    return (
      <div className="App">
        <div className="menu container-fluid">
          <div className="menu-form-buttons">
            <button
              onClick={this.onClick}
              className={
                this.state.buttonPressed
                  ? "menu-form-buttons-add-pressed"
                  : "menu-form-buttons-add"
              }
            >
              <h4>Dodaj</h4>
            </button>
            <button
              onClick={this.onClick1}
              className={
                this.state.buttonPressed1
                  ? "menu-form-buttons-list-pressed"
                  : "menu-form-buttons-list"
              }
            >
              <h4>Zadania ({this.state.tasks.length})</h4>
            </button>
            <button
              onClick={this.onClick2}
              className={
                this.state.buttonPressed2
                  ? "menu-form-buttons-summary-pressed"
                  : "menu-form-buttons-summary"
              }
            >
              <h4>Podsumowanie</h4>
            </button>
          </div>
          <Form className="menu-form col-xs-6 mx-auto">
            {this.state.render === "" ? <Tasks /> : this._renderSubComp()}
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
