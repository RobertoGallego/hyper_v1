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
                    {/* <AuthRoute exact path='/signin' component={Loginn} /> */}
                    {/* <AuthRoute exact path='/signup' component={Registerr} /> */}
                    {/* <Route exact path="/posts/:postId" component={SinglePost} /> */}
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;

// import React from 'react';
// import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';
// import SignIn from './components/signin';
// import SignUp from './components/signup';
// import PrivateArea from './components/members/PrivateArea';

// import ExampleApp from './Appexample';

// export default class App extends React.Component {
//     render() {
//         return (
//             <Router>
//                 <Switch>
//                     <Route exact path='/' component={Home} />
//                     <Route exact path='/signin' component={SignIn} />
//                     <Route exact path='/signup' component={SignUp} />
//                     <Route exact path='/example' component={ExampleApp} />
//                     <PrivateArea
//                         exact
//                         path='/private-area'
//                         component={PrivateArea}
//                     />
//                 </Switch>
//             </Router>
//         );
//     }
// }

// function Home() {
//     return (
//         <div>
//             <h2>Home</h2>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to='/'>Home</Link>
//                     </li>
//                     <li>
//                         <Link to='/signin'>Sign In</Link>
//                     </li>
//                     <li>
//                         <Link to='/signup'>Sign up</Link>
//                     </li>
//                     <li>
//                         <Link to='/example'>Example</Link>
//                     </li>
//                     <li>
//                         <Link to='/private-area'>private-area</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }
