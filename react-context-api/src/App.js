import React, { Component } from 'react';
import './App.css';


// This is the context for holding values in app state level :
const MyContext = React.createContext();


// This is the context provider compoment
class ContextProvider extends Component {

  state = {
    name: 'Wes',
    age: 10,
    cool: true
  }

  render() {
    return (
      <MyContext.Provider value= {{
        state: this.state,
        incrementAge: () => this.setState({ age: this.state.age + 1})
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}


function Person() {
  return (
    <div className='person'>
      <MyContext.Consumer>
        {(context) => (
          <React.Fragment>
            <p>Name: {context.state.name}</p>
            <p>Age: {context.state.age}</p>
            <button onClick={context.incrementAge}>🍰</button>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    </div>
  );
}


const Family = (props) => (
  <div className='family'>
     <Person /> 
  </div>
)

function App() {
  return (
    // wrapping everything inside the context provider component ->
    <ContextProvider>
      <div className="App">
        <p>I am the App</p>
        <Family />
      </div>
    </ContextProvider>
  );
}

export default App;
