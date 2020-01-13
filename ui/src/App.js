import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

// import MenuBar from './components/MenuBar';
import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile/Profile';
import Edit from './components/profile/Edit';
// import SinglePost from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <Route exact path='/' component={Home} />
                    <AuthRoute exact path='/login' component={Login} />
                    <AuthRoute exact path='/register' component={Register} />
                    <AuthRoute exact path='/profile' component={Profile} />
                    <AuthRoute exact path='/edit' component={Edit} />
                </Container>
            </Router>    
        </AuthProvider>
    );
}

export default App;
