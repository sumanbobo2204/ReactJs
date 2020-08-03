import React from 'react';
import './App.css';
import Posts from './components/Posts';
import PostForm from './components/PostForm';
import { Provider } from 'react-redux'; // -> Its a glue btwn react & redux
import store from './Store' // redux store


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>
            Blog Post App
          </p>
        </header>
        <PostForm />
        <Posts />
      </div>
    </Provider>

  );
}



export default App;
