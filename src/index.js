import React, { Component } from 'react';
import { render } from 'react-dom';

import Home from './Home';
import Hello from './Hello';
import './style.css';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";


let rootReducer = combineReducers({
  name: (state = ' MY name ', action) => {
    switch (action.type) {
      case 'newname':
        return action.name
      default:
        return state
    }
  }
});

let store = createStore(rootReducer);

store.subscribe(() => {
  console.log(store.getState())
}

)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (

      <Provider store={store}>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Hello">Hello</Link>
              </li>

            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route exact path="/Hello" component={Hello} />
          </div>
        </Router>
      </Provider>



    );
  }
}

render(<App />, document.getElementById('root'));
