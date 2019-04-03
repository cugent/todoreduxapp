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

 // deleteTask = id => {
  //  console.log("delete",id);
   // this.props.deleteTask(id);
  //};

 // updateTask = (obj) => {
   // let obj = {
   //   name,
   //   id:id
  //  };
    //console.log( "update",obj)
    //this.props.updateTask(obj);
  //};
 // createTask = (obj) => {
  //  let obj = {
  //    name,
  //    id:this.state.nextID
 //   };
  //  this.setState({ nextID: this.state.nextID+1});
 //   console.log("create",obj);
  //  this.props.createTask(obj);
     
 // };

  render() {
   
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
              path="/home"
              render={props => {
                return <ToDoManager  />;
              }}
            />
            <Route
              path="/editview/:id"
              render={props => {
                return <EditViewTodo  {...props}  />;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks
})

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask(id)),
  createTask: (payload) => dispatch(createTask(payload)),
  updateTask: (id) => dispatch(updateTask(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
