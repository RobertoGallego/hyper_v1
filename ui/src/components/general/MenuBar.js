import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoMenu from "../../assets/images/hyperlogo.png";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import logoSearch from "../../assets/images/lupsearch.png";

// function MenuBar({ fetchMovies }) {

function MenuBar({ fetchMovies, pageReset, listReset }) {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [textState, setTextState] = useState("");

  const searchChange = e => {
    setTextState(e.target.value);
  };

  const sendSearch = () => {
    fetchMovies(textState);
    pageReset(1);
    listReset([]);
  };

  const loc = useLocation();
  const isHome = loc.pathname === "/";

  if (user) {
    return (
      <Nav>
        <Menubar>
            <Link to="/">
            <Pict src={logoMenu} alt="Hypertube" />
            </Link>
            <StyledLinka href="/">{t('header.home')}</StyledLinka>
            <StyledLink href="/profile">{t('header.profile')}</StyledLink>
            <StyledLink onClick={logout} href="/login">{t('header.logout')}</StyledLink>
        </Menubar>
        <Searchbar>
            {isHome && (
                <Bar>
                  <Input
                        onChange={searchChange}
                        value={textState}
                        name="search"
                        placeholder={t('header.placeholder.search')}
                  />
                <Search 
                    type="image"
                    src={logoSearch}
                    alt="Submit"
                    onClick={sendSearch}> 
                    {/* {t('header.search')} */}
                </Search>
                </Bar>
            )}
        </Searchbar>  
      </Nav>
    );
  }
  return <Link to="/">Please Click Here to log</Link>;
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  /* background-color: #191919; */
  background: ${props => props.theme.colors.cardBackground};
  padding: 1rem 3.5rem;
`;

const Menubar = styled.div`
`

const StyledLink = styled.a`
    /* color: #fff; */
    color: ${props => props.theme.colors.textColor};
    font-size: 16px;
    padding: 0 1rem;
    transition-duration: 0.3s;
    &:hover {
        color: #db202c;
        text-decoration: none;
    }
`;

const StyledLinka = styled.a`
    transition-duration: 0.3s;
    /* color: #fff; */
    color: ${props => props.theme.colors.textColor};
    font-size: 16px;
    margin-left: 5rem;
    padding: 0 1rem;
    &:hover {
        color: #db202c;
        text-decoration: none;
    }
    @media (max-width: 768px) {
      margin: 1rem;
      margin-left: 1.2rem;
    }
`;

const Pict = styled.img`
  margin-left: 1rem;
  cursor: pointer;
  @media (max-width: 768px) {
      margin: 1rem 0 2rem 1.5rem;
    }
`;

const Searchbar = styled.div`
  justify-content: center;
`;

const Bar = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    @media (max-width: 768px) {
        margin-top: 2rem;
        margin-left: 1rem;
      }
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  background: ${props => props.theme.colors.barras};
  border: none;
  font-size: 10pt;
  color: white;
  outline: 0;
  padding-left: 40px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

const Search = styled.input`
    width: 3rem;
    border-color: #db202c;
    background-color: #db202c;
    color: white;
    border-radius: 15rem;
    padding: 10px 15px;
    transition-duration: 0.3s;
    margin: 0 0 0 0.5rem;
    outline: 0;
    &:hover {
        opacity: 0.5;
    }
`;

export default MenuBar;
