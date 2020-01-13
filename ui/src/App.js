import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

// import MenuBar from './components/MenuBar';
import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Register from './components/register';
import Login from './components/login';
// import SinglePost from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Route exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/register' component={Register} />
            </Router>
        </AuthProvider>
    );
}

export default App;
