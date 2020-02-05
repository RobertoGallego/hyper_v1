import React, { useContext, useEffect } from 'react';
// import React from 'react';
import { AuthContext } from './auth';

import { useCookies } from 'react-cookie';
 
function SocialAuthRedirect(props) {
    const context = useContext(AuthContext);
    const [cookies] = useCookies(['auth']);
    localStorage.setItem('jwtToken', cookies.auth);
//   function onChange(newName) {
//     setCookie('auth', newName, { path: '/' });
//     console.log(newName);
//   }

  useEffect(() => {
    async function getCookie() {
        // await console.log(cookies.auth);
        await localStorage.setItem('jwtToken', cookies.auth);

        // await console.log(caca);
        await context.login(cookies.auth);
        // await removeCookie('auth');
        await props.history.push('/');
        
        // await localStorage.clear()
      }
      // Execute the created function directly
      getCookie();
      // removeCookie('auth');
    // window.addEventListener('mousemove', () => {});
    // returned function will be called on component unmount 
    // return () => {
    //   window.removeEventListener('mousemove', () => {})
    // }
  // }, [context, cookies.auth, props.history]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <div></div>
    //   {cookies.auth && <h6>{cookies.auth}</h6>}
    // </div>
  );
}

export default SocialAuthRedirect;



// ---
// import React, { useContext, Component } from 'react';
// import { AuthContext } from './auth';
// // import { instanceOf } from 'prop-types';
// import { withCookies } from 'react-cookie';
// class SocialAuthRedirect extends Component {
//     // static propTypes = {
//     //     cookies: instanceOf(Cookies).isRequired
//     // };
//     constructor(props) {
//         super(props);
//         const { cookies } = props;
//         // const context = useContext(AuthContext);
//         // context.login(this.state.name);
//         this.state = {
//             name: cookies.get('auth')
//         };
//     }
//     async componentWillMount() {
//         await console.log(this.state.name);
//         // await this.props.context;
//         // console.log(userData);
//         // context.login(userData);
//         this.props.history.push('/SocialAuthRedirect');
//     }
//     // handleNameChange(name) {
//     //     const { cookies } = this.props;
//     //     cookies.set('name', name, { path: '/' });
//     //     this.setState({ name });
//     // }
//     render() {
//         return (
//             <div></div>
//             // <div>{this.state.name && <h5>{this.state.name}</h5>}</div>
//         );
//     }
// }
// export default withCookies(SocialAuthRedirect);
// ---
// class SocialAuthRedirect extends Component {
//     static propTypes = {
//         cookies: instanceOf(Cookies).isRequired
//     };
//     constructor(props) {
//         super(props);
//         const { cookies } = props;
//         this.state = {
//             name: cookies.get('auth')
//         };
//     }
//     handleNameChange(name) {
//         const { cookies } = this.props;
//         cookies.set('name', name, { path: '/' });
//         this.setState({ name });
//     }
//     render() {
//         const { name } = this.state;
//         return (
//             <div>{this.state.name && <h1>Hello {this.state.name}!</h1>}</div>
//         );
//     }
// }
// export default withCookies(SocialAuthRedirect);
// import React, { Component } from 'react';
// import { AuthContext } from './auth';
// import { Cookies } from 'react-cookie';
// class SocialAuthRedirect extends Component {
//     componentWillMount() {
//         this.props.dispatch(
//             AuthContext(Cookies('auth'), () => {
//                 document.cookie =
//                     'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//                 this.props.history.push('/profile');
//             })
//         );
//     }
//     render() {
//         return <div />;
//     }
// }
// export default SocialAuthRedirect;