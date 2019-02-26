import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk'
import reducer from './Reducer.js';
import {BrowserRouter as Router, Route} from "react-router-dom";
import HomeScreen from './screens/HomeScreen.js';
import Login from "./forms/Login";
import Registration from "./forms/Registration";

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production'){
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <>
                <Route exact path="/" component={HomeScreen}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
            </>
        </Router>
      </Provider>
    );
  }
}

export default App;
