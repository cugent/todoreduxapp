import React from "react";
import { Link } from "react-router-dom";

class TodoManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  render() {
    return (
      <div>
        <h1>Task List</h1>
        <input onChange={this.handleChange} style={{ width: "150px", display: "inline-block" }} type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Task" />
        <button onClick={() => this.props.createTask(this.state.name)} type="button" className="btn btn-primary">
          Create
        </button>
        {this.props.tasks.map((task, index) => {
          return (
            <ul>
              <li>
                <Link to={`/editview/${task.id}`}>{task.name}</Link>
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default TodoManager;
