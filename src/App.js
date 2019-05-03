import React, { Component } from "react";
import "./App.css";
import { Jumbotron, Button, Form, Row } from "react-bootstrap";

import AddTask from "./components/addTask";
import Tasks from "./components/tasks";
import Summary from "./components/summary";

class App extends Component {
  constructor() {
    super();
    this.state = {
      render: "",
      buttonPressed: true,
      buttonPressed1: false,
      buttonPressed2: false
    };
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
          <Form className="menu-form col-xs-6 mx-auto">
            {this.state.render === "" ? <addTask /> : this._renderSubComp()}
            <div className="menu-form-buttons">
              <Button
                onClick={this.onClick}
                className={"menu-form-buttons-add"}
              >
                <h4>Dodaj</h4>
              </Button>
              <Button
                onClick={this.onClick1}
                className={"menu-form-buttons-list"}
              >
                <h4>Zadania ({})</h4>
              </Button>
              <Button
                onClick={this.onClick2}
                className={"menu-form-buttons-summary"}
              >
                <h4>Podsumowanie</h4>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default App;
