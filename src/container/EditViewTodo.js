import React from "react";
import { withRouter } from "react-router-dom";

import { deleteTask, updateTask } from '../redux';
import { connect } from 'react-redux';

class EditViewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  componentDidMount(){
    let name="";
    for(let i=0;i< this.props.tasks.length;i++){
     if(parseInt(this.props.match.params.id) === this.props.tasks[i].id){
       name= this.props.tasks[i].name;
     }

    }
    this.setState({name:name})
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    let task = this.props.tasks.find(obj => {
      return obj.id === parseInt(this.props.match.params.id);
    });
    
    return (
      <div>
        <h1>Task {this.props.match.params.id}</h1>
        {task && (
          <input onChange={this.handleChange} style={{ width: "150px", display: "inline-block" }} type="text" placeholder={this.state.name} className="form-control" id="name" aria-describedby="emailHelp" />
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
            let obj = {
              name:this.state.name === "" ? task.name : this.state.name,
              id:task.id
            };
            this.props.updateTask(obj);
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
const mapStateToProps = (state) => ({
  tasks: state.tasks
})

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask(id)),
  updateTask: (id) => dispatch(updateTask(id)),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(EditViewTodo);

//export default withRouter(EditViewTodo);
