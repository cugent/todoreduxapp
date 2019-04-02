import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { Redirect, BrowserRouter } from "react-router-dom";
import ToDoManager from "./container/TodoManager";
import EditViewTodo from "./container/EditViewTodo";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          id: 1,
          name: "Learn React"
        },
        {
          id: 2,
          name: "Learn Redux"
        },
        {
          id: 3,
          name: "Learn Express"
        }
      ],
      nextID: 4
    };
  }

  deleteTask = id => {
    let newTaskList = this.state.tasks;

    let index = newTaskList.findIndex(obj => {
      return obj.id === id;
    });

    newTaskList.splice(index, 1);

    this.setState({ tasks: newTaskList });
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
    let newTaskList = this.state.tasks;
    let id = this.state.nextID;
    let obj = {
      name,
      id
    };
    newTaskList.push(obj);
    this.setState({ tasks: newTaskList, nextID: id++ });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={props => {
                return <ToDoManager {...props} tasks={this.state.tasks} createTask={this.createTask} />;
              }}
            />
            <Route
              path="/editview/:id"
              render={props => {
                return <EditViewTodo deleteTask={this.deleteTask} updateTask={this.updateTask} {...props} tasks={this.state.tasks} />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
