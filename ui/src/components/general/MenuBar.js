import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { AuthContext } from '../../context/auth';
import './components.css';
import logoTop from '../../assets/images/logo-top.png';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    // <Menu pointing secondary size="massive" color="teal">
    //   <Menu.Item name={user.username} active as={Link} to="/" />

    //   <Menu.Menu position="right">
    //     <Menu.Item name="logout" as={Link} onClick={logout} />
    //   </Menu.Menu>
    // </Menu>
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <a className="navbar-brand" href="/"><img src={logoTop} alt="Hypertube" height="75" width="140"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Preferences</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={logout}>Logout</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2 pr-sm-5" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
    </nav>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />

        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
