import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Todos from './components/Todos'
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/Pages/About';
import axios from 'axios';


// function for creating uuid for Todos :
function create_UUID(){
  let dt = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c==='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

class App extends Component {

  state = {
    todos: []
  }

  // Fetching the Todos from fake api :
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=15")
      .then(res => this.setState({ todos: res.data }));
    
    // eta dekhte hbe ..
    this.setState({
      todos: this.state.todos.map(
        todo => {
          todo.completed = false;
        }
      )
    });
  }

  // Toggle complete :
  markComplete = (id) => {
    this.setState( { todos: this.state.todos.map( todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })}
    );
  }
  
  // Deleting a Todo with a fake api:
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  }

  // Adding a Todo by making a HTTP POST req to a fake api :
  addTodo = (title) => {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
      .then(res => {
        res.data.id = create_UUID();
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  }


  render() {

    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />

            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete}
                  delTodo={this.delTodo} />
              </React.Fragment>
            )}
            />
            <Route path="/about" component={About} />

          </div>
        </div>
      </Router>
    );
  }
  
}




export default App;
