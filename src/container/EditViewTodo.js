import React from "react";
import { withRouter } from "react-router-dom";

class EditViewTodo extends React.Component {
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
    let task = this.props.tasks.find(obj => {
      console.log(this.props.match.params.id);

      return obj.id === parseInt(this.props.match.params.id);
    });
    console.log(task);
    return (
      <div>
        <h1>Task {this.props.match.params.id}</h1>
        {task && (
          <input onChange={this.handleChange} style={{ width: "150px", display: "inline-block" }} type="text" placeholder={task.name} className="form-control" id="name" aria-describedby="emailHelp" />
        )}
        <button
          onClick={() => {
            this.props.history.goBack();
            this.props.deleteTask(task.id);
          }}
          type="button"
          className="btn btn-primary"
        >
          Delete
        </button>
        <button
          onClick={() => {
            this.props.history.goBack();
            this.props.updateTask(this.state.name === "" ? task.name : this.state.name, task.id);
          }}
          type="button"
          className="btn btn-primary"
        >
          Update
        </button>
      </div>
    );
  }
}

export default withRouter(EditViewTodo);
