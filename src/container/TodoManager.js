import React from "react";
import { Link } from "react-router-dom";
import { createTask } from '../redux';
import { connect } from 'react-redux';

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
        <button onClick={() => {let obj = {
                                           name:this.state.name,
                                           id:this.props.nextID
                                          };   
                                          this.props.createTask(obj)}} type="button" className="btn btn-primary">
          Create
        </button>
        {  this.props.tasks &&  this.props.tasks.map((task, index) => {
          return (
            <ul>
              <li >
                <Link  to={`/editview/${task.id}`}>{task.name}</Link>
              </li>
            </ul>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  tasks: state.tasks,
  nextID:state.nextID
})

const mapDispatchToProps = (dispatch) => ({
createTask: (payload) => dispatch(createTask(payload))
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(TodoManager);