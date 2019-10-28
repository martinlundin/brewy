import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// MUI
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import customTheme from './util/theme';

// Local
import { AuthProvider } from './firebase/auth';
import { StatusProvider } from './util/status';
import PrivateRoute from './util/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Brewery from './pages/Brewery';
import Header from './components/Header';
import Toast from './components/Toast';

export default function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={createMuiTheme(customTheme)}>
        <CssBaseline />
        <AuthProvider>
          <StatusProvider>
            <Router>
              <Header />
              <Toast />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/brewery" component={Brewery} />
                <PrivateRoute exact path="/brewery/:brewId" component={Brewery} />
              </Switch>
            </Router>
          </StatusProvider>
        </AuthProvider>
      </MuiThemeProvider>
    </div>
  );
}
