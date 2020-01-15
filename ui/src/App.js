import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import SecureRoute from './util/SecureRoute';

// import MenuBar from './components/MenuBar';
import Home from './home/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile/Profile';
import Edit from './components/profile/Edit';
import Movie from './components/viewer/Movie';
// import SinglePost from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <SecureRoute exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/register' component={Register} />
                <SecureRoute exact path='/profile' component={Profile} />
                <SecureRoute exact path='/edit' component={Edit} />
                <SecureRoute exact path='/movie' component={Movie} />
            </Router>    
        </AuthProvider>
    );
}

export default App;
