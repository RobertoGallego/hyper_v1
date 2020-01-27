import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import SecureRoute from "./util/SecureRoute";

import Home from "./home/Home";
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile/Profile';
import Edit from './components/profile/Edit';
import Movie from './components/viewer/Movie';
import Resetpassword from './components/resetpassword';
import UpdatePassword from './components/resetpassword/updatepassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <SecureRoute exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        <Route exact path='/resetpassword' component={Resetpassword} />
        <AuthRoute exact path='/updatepassword' component={UpdatePassword} />
        <SecureRoute exact path="/profile" component={Profile} />
        <SecureRoute exact path="/edit" component={Edit} />
        <SecureRoute exact path="/movie/:id" component={Movie} />
      </Router>
    </AuthProvider>
  );
}

export default App;