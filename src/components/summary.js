import React from "react";
import { fbase } from "../fbase";
import "../css/summary.css";

class Summary extends React.Component {
  constructor() {
    super();
    this.state = {
      done: [],
      unDone: []
    };
  }

  componentDidMount() {
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

  cleanSummary = () => {
    event.preventDefault();
    this.setState({
      done: [],
      unDone: []
    });
  };
  render() {
    console.log(this.state.done);
    return (
      <div className="container-fluid">
        <div className="row menu-summary">
          <div className="col-md-6">
            <h2>Wykonane zadania</h2>
            {Array.isArray(this.state.done) ? (
              this.state.done.map((item, index) => {
                return (
                  <div className="menu-summary-task">
                    {index + 1}. {item.description}
                  </div>
                );
              })
            ) : (
              <p> ...to dobry powód do odpoczynku. </p>
            )}
          </div>
          <div className="col-md-6">
            <h2>Niewykonane zadania</h2>
            {Array.isArray(this.state.unDone) ? (
              this.state.unDone.map((item, index) => {
                return (
                  <div className="menu-summary-task">
                    {index + 1}. {item.description + " "}
                    {item.reason === " " ? "" : "powód: " + item.reason}
                  </div>
                );
              })
            ) : (
              <p>
                {" "}
                ...zdarzają się wszystkim, ale nie wszyscy wyciągają z nich
                wnioski.
              </p>
            )}
          </div>
          <button className="clean-summmary" onClick={this.cleanSummary}>
            Wyczyść podsumowanie
          </button>
        </div>
      </div>
    );
  }
}

export default Summary;
