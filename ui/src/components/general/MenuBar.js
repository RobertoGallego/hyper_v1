import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/hyperlogo.png";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

  export default function MenuBar({ fetchMovies, pageReset, listReset, genreAdd, sortAdd, reverseAdd}) {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [textState, setTextState] = useState("");
  const [genreState, setGenreState] = useState("");
  const [sortState, setSortState] = useState("rating");
  const [reverseState, setReverseState] = useState("desc");

  const searchChange = e => {
    setTextState(e.target.value);
  };

  const genreChange = e => {
    setGenreState(e.target.value);
  };

  const sortChange = e => {
    setSortState(e.target.value);
  };

  const reverseChange = e => {
    if (e.target.checked)
      setReverseState("asc");
    else
      setReverseState("desc");
  }

  const sendSearch = () => {
    fetchMovies(textState);
    pageReset(1);
    listReset([]);
    genreAdd(genreState);
    sortAdd(sortState);
    reverseAdd(reverseState);
  };

  const loc = useLocation();
  const isHome = loc.pathname === "/";

  if (user) {
    return (
      <Nav>
        <Link to="/">
          <Pict src={logoTop} alt="Hypertube" />
        </Link>
        <StyledLink href="/">{t('header.home')}</StyledLink>
        <StyledLink href="/profile">{t('header.profile')}</StyledLink>
        <StyledLink onClick={logout} href="/login">
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
          </Bar>)}
        {isHome && (
          <Filter>
            <Slct onChange={genreChange}>
              <Opt value="">Gender</Opt>
              <Opt value="action">Action</Opt>
              <Opt value="adventure">Adventure</Opt>
              <Opt value="animation">Animation</Opt>
              <Opt value="comedy">Comedy</Opt>
              <Opt value="crime">Crime</Opt>
              <Opt value="documentary">Documentary</Opt>
              <Opt value="drama">Drama</Opt>
              <Opt value="fantasy">Fantasy</Opt>
              <Opt value="history">History</Opt>
              <Opt value="horror">Horror</Opt>
              <Opt value="sci-fi">Sci-Fi</Opt>
              <Opt value="thriller">Thriller</Opt>
              <Opt value="war">War</Opt>
              <Opt value="western">Western</Opt>
            </Slct>
            <Slct onChange={sortChange}>
              <Opt value="rating">Rating</Opt>
              <Opt value="year">Year</Opt>
              <Opt value="title">Title</Opt>
              <Opt value="peers">Peers</Opt>
            </Slct>
            <Check onChange={reverseChange} type ="checkbox" name="reverse"/>
            <Label htmlFor="reverse">Reverse</Label>
          </Filter>
        )}
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

const StyledLink = styled.a`
    /* color: #fff;
    font-size: 16px;
    padding: 0 1rem;
    transition-duration: 0.3s;
    &:hover {
      color: #db202c;
      text-decoration: none;
    } */
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
    margin: 0 20vw 1vh;
    width: 50vw;
  }
`;

const Bar = styled.div`
  /* display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin-top: 2rem;
  } */
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
  font-size: 1rem;
  color: white;
  outline: 0;
  padding-left: 40px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

const Search = styled.div`
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

const Filter = styled.div``;

const Slct = styled.select`

`
const Opt = styled.option`

`

const Check = styled.input`

`

const Label = styled.label``
