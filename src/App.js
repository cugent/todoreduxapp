import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { Redirect, BrowserRouter } from "react-router-dom";
import ToDoManager from "./container/TodoManager";
import EditViewTodo from "./container/EditViewTodo";
import { deleteTask, createTask,updateTask } from './redux';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
    super(props);
   console.log("props",props)
    this.state = {
     
     nextID: 1
    };
  }

  deleteTask = id => {

    let index = this.props.tasks.findIndex(obj => {
      return obj.id === id;
    });
    this.props.deleteTask(index);
  };

  updateTask = (name, id) => {
    let newTaskList = this.state.tasks;

    let index = newTaskList.findIndex(obj => {
      return obj.id === id;
    });

    newTaskList[index].name = name;

    this.setState({ tasks: newTaskList });
  };
  createTask = name => {
  console.log("create",name);
    let obj = {
      name,
      id:this.state.nextID
    };
    this.setState({ nextID: this.state.nextID++});
    this.props.createTask(obj);
     
  };

  render() {
    console.log("reneder",this.props.tasks)
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={props => {
                return <ToDoManager {...props} tasks={this.props.tasks} createTask={this.createTask} />;
              }}
            />
            <Route
              path="/editview/:id"
              render={props => {
                return <EditViewTodo deleteTask={this.deleteTask} updateTask={this.updateTask} {...props} tasks={this.props.tasks} />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log( "maptstate",state)
  return {

    tasks: state.tasks,
    nextID:state.nextID

  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask(id)),
  createTask: (payload) => dispatch(createTask(payload)),
  updateTask: (id) => dispatch(updateTask(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
