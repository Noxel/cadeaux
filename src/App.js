import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './Reducer.js';
import {BrowserRouter as Router} from "react-router-dom";
import HomeScreen from './screens/HomeScreen.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const middleware = [thunk];
if (process.env.NODE_ENV !== 'production'){
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#f6685e',
      main: '#f44336',
      dark: '#aa2e25',
    },
    secondary: {
      light: '#68b36b',
      main: '#43a047',
      dark: '#2e7031',
    }
  }
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>  
            <HomeScreen />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;