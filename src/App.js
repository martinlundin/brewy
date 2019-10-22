import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import customTheme from './util/theme';

import { AuthProvider } from './util/auth';
import PrivateRoute from './util/PrivateRoute';

//Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Brewery from './pages/Brewery';

//Import components
import Header from './components/Header';
import Global from './components/Global';
import Axios from 'axios';

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <MuiThemeProvider theme={createMuiTheme(customTheme)}>
          <AuthProvider>
            <Router>
              <Header />
              <Global />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/brewery" component={Brewery} />
              </Switch>
            </Router>
          </AuthProvider>
      </MuiThemeProvider>
    </div>
  );
}
