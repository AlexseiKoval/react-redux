import React, { Component } from 'react';
import { render } from 'react-dom';

import SearchAppBar from './components/panel';
import Products from './components/products';
import Product from './components/product';

import './style.css';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";


let rootReducer = combineReducers({
  search: (state = '', action) => {
    switch (action.type) {
      case 'newsearch':
        return action.search
      default:
        return state
    }
  },
  products: (state = [{ id: 1, title: 'first title' }], action) => {

    switch (action.type) {
      case 'updateproduct':
        const findState = action.product.id ? state.find(row => row.id.toString() === action.product.id.toString()) : ''
        if (findState) {
          findState.title = action.product.title
          return [...state]
        } else {
          const maxId = state.reduce((acum, row) => row.id > acum ? row.id : acum, 1)

          console.log('maxId', maxId)
          return [...state, { id: (maxId + 1), title: action.product.title }]
        }
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
  }

  onChangeSearsh = (value) => {
    store.dispatch({ type: 'newsearch', search: value })
  }

  render() {
    return (

      <Provider store={store}>
        <SearchAppBar onChangeSearsh={this.onChangeSearsh} value={store.getState().search} />
        <Router>
          <div>
            <hr />
            <Route exact path="/" component={Products} />
            <Route exact path={"/Product/:id"} component={Product} />
            <Route exact path={"/Product"} component={Product} />
          </div>
        </Router>
      </Provider>



    );
  }
}

render(<App />, document.getElementById('root'));
