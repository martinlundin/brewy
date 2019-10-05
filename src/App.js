import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import CssBaseline from '@material-ui/core/CssBaseline';
import customTheme from './util/theme'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import store from './redux/store'
import AuthRoute from './util/AuthRoute'

//Import pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

//Import components 
import Header from './components/Header'
import Global from './components/Global'
import { logoutUserAction, getCurrentUserDataAction } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';
import Axios from 'axios'

const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)

  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUserAction())
    window.location.href = '/login'
  } else {
    store.dispatch({ type: SET_AUTHENTICATED})
    Axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getCurrentUserDataAction())
  }
}

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <MuiThemeProvider theme={createMuiTheme(customTheme)}>
        <Provider store={store}>
          <Router>
            <Header/>
            <Global/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <AuthRoute exact path="/login" component={Login}/>
              <AuthRoute exact path="/register" component={Register}/>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}