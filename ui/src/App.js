import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import SecureRoute from "./util/SecureRoute";

import Home from "./home/Home";
import Register from "./components/register";
import Login from "./components/login";
import Profile from "./components/profile/Profile";
import ProfileView from "./components/profile/ProfileView";
import Edit from "./components/profile/Edit";
import Movie from "./components/viewer/Movie";
import Resetpassword from "./components/resetpassword";
import UpdatePassword from "./components/resetpassword/updatepassword";
import ModifyPassword from "./components/profile/ModifyPassword";
import SocialAuthRedirect from "./context/SocialAuthRedirect";

import styled, { ThemeProvider } from "styled-components";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";

// import SinglePost from './pages/SinglePost';

function App() {
    const stored = localStorage.getItem("isDarkMode");
    const [status, setStatus] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        stored === "true" ? true : false
    );

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Suspense fallback="loading">
                <AuthProvider>
                <Router>

                <DarkLight
                    onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    setStatus(!status)
                    localStorage.setItem("isDarkMode", !isDarkMode);
                    }}
                >
                    {status ? 'Dark' : 'Light'}
                </DarkLight>
                
                <SecureRoute exact path="/" component={Home} />
                <Route exact path="/resetpassword" component={Resetpassword} />
                <AuthRoute exact path="/updatepassword" component={UpdatePassword} />
                <Route
                    exact
                    path="/SocialAuthRedirect"
                    component={SocialAuthRedirect}
                />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={Register} />
                <SecureRoute exact path="/profile" component={Profile} />
                <SecureRoute exact path="/profile/:id" component={ProfileView} />
                <SecureRoute exact path="/edit" component={Edit} />
                <SecureRoute exact path="/movie/:id" component={Movie} />
                <SecureRoute
                    exact
                    path="/modifyPassword"
                    component={ModifyPassword}
                />
                </Router>
                </AuthProvider>
            </Suspense>
        </ThemeProvider>
    );
}

const DarkLight = styled.button`
background: ${props => props.theme.colors.buttonBackground};
color: ${props => props.theme.colors.buttonColor};
position: absolute;
/* bottom: 0; */
/* display: block; */
margin: 24px;
/* max-width: 100%; */
border: none;
/* line-height: 36px; */
/* padding: 0 12px; */
border-radius: 4px;
font-size: 14px;
`;
export default App;
