import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/hyperlogo.png";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

  export default function MenuBar({ fetchMovies, pageReset, listReset, genreAdd, sortAdd, reverseAdd }) {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [textState, setTextState] = useState("");
  const [genreState, setGenreState] = useState("");
  const [sortState, setSortState] = useState("vote_average");
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

  const send = () => {
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
            <Search onClick={send}>{t('header.search')}</Search>
          </Bar>)}
        {isHome && (
          <Filter>
            <Slct onChange={genreChange}>
              <Opt value="">Gender</Opt>
              <Opt value="28">Action</Opt>
              <Opt value="12">Adventure</Opt>
              <Opt value="16">Animation</Opt>
              <Opt value="35">Comedy</Opt>
              <Opt value="80">Crime</Opt>
              <Opt value="99">Documentary</Opt>
              <Opt value="18">Drama</Opt>
              <Opt value="14">Fantasy</Opt>
              <Opt value="36">History</Opt>
              <Opt value="27">Horror</Opt>
              <Opt value="878">Sci-Fi</Opt>
              <Opt value="53">Thriller</Opt>
              <Opt value="10752">War</Opt>
              <Opt value="37">Western</Opt>
            </Slct>
            <Slct onChange={sortChange}>
              <Opt value="vote_average">Rating</Opt>
              <Opt value="release_date">Year</Opt>
              <Opt value="original_title">Title</Opt>
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
  background-color: #191919;
  padding: 1rem 1rem;
`;

const StyledLink = styled.a`
  color: #fff;
  font-size: 16px;
  padding: 0 1rem;
  transition-duration: 0.3s;
  &:hover {
    color: #db202c;
    text-decoration: none;
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
  display: flex;
  align-items: center;
  margin-right: 1rem;
  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  background: #2b303b;
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
