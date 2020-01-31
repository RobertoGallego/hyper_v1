import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/logo-top.png";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Nav = styled.nav`
  display: flex;
  background-color: #191919;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  color: #666;
  font-size: 20px;
  margin: 25px 15px;

  &:hover {
    color: #db202c;
    text-decoration: none;
  }
`;

const Pict = styled.img`
  height: 75px;
  width: 130px;
  margin: 0 20px;
`;

const Bar = styled.div``;

const Input = styled.input`
  background-color: #191919;
  border: none;
  border-bottom: 1px solid white;
  margin: 25px 15px;
  color: white;
  outline: none;
`;

const Search = styled.button`
  border-color: #db202c;
  background-color: #db202c;
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  transition-duration: 0.3s;

  &:hover {
    color: black;
  }
`;

function MenuBar({ fetchMovies }) {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [textState, setTextState] = useState("");

  const searchChange = e => {
    setTextState(e.target.value);
  };

  const sendSearch = () => {
    fetchMovies(textState);
  };

  const loc = useLocation();
  const isHome = loc.pathname === "/";

  if (user) {
    return (
      <Nav>
        <Link to="/">
          <Pict src={logoTop} alt="Hypertube" />
        </Link>
        <StyledLink to="/">{t('header.home')}</StyledLink>
        <StyledLink to="/profile">{t('header.profile')}</StyledLink>
        <StyledLink onClick={logout} to="/login">
          {t('header.logout')}
        </StyledLink>
        {isHome && (
          <Bar>
            <Input
              onChange={searchChange}
              value={textState}
              name="search"
              placeholder={t('header.search')}
            />
            <Search onClick={sendSearch}>{t('header.search')}</Search>
          </Bar>
        )}
      </Nav>
    );
  }
  return <Link to="/">Please Click Here to log</Link>;
}

export default MenuBar;
