import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

// import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Registerr from './components/register';
import Loginn from './components/login';
// import SinglePost from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    {/* <MenuBar /> */}
                    <Route exact path='/' component={Home} />
                    <AuthRoute exact path='/login' component={Login} />
                    <AuthRoute exact path='/register' component={Register} />
                    <AuthRoute exact path='/signin' component={Loginn} />
                    <AuthRoute exact path='/signup' component={Registerr} />
                    {/* <Route exact path="/posts/:postId" component={SinglePost} /> */}
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
