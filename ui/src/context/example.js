import React from 'react';
import { useCookies } from 'react-cookie';
 
import NameForm from './NameForm';
 
function App() {
  const [cookies, setCookie] = useCookies(['name']);
 
  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }
 
  return (
    <div>
      <NameForm name={cookies.name} onChange={onChange} />
      {cookies.name && <h1>Hello {cookies.name}!</h1>}
    </div>
  );
}
 
export default App;


----------------------------------------

import React, { useContext, Component } from 'react';
import { AuthContext } from './auth';
// import { instanceOf } from 'prop-types';
import { withCookies } from 'react-cookie';
class SocialAuthRedirect extends Component {
    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            name: cookies.get('auth')
        };
    }
    async componentWillMount() {
        await console.log(this.state.name);
        this.props.history.push('/SocialAuthRedirect');
    }
    // handleNameChange(name) {
    //     const { cookies } = this.props;
    //     cookies.set('name', name, { path: '/' });
    //     this.setState({ name });
    // }
    render() {
        return (
            <div></div>
            // <div>{this.state.name && <h5>{this.state.name}</h5>}</div>
        );
    }
}
export default withCookies(SocialAuthRedirect);