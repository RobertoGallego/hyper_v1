import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/logo-top.png";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

export default function MenuBar({ fetchMovies, pageReset, listReset }) {
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
            <Slct name="gender">
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
              <Opt value="9648">Mystery</Opt>
              <Opt value="878">Sci-Fi</Opt>
              <Opt value="53">Thriller</Opt>
              <Opt value="10752">War</Opt>
              <Opt value="37">Western</Opt>
            </Slct>
          </Filter>
        )}
        {isHome && (
          <Filter>
            <Check type ="checkbox" name="date" />
            <Label for="date">Date</Label>
            <Check type ="checkbox" name="duration" />
            <Label for="duration">Duration</Label>
            <Check type ="checkbox" name="reverse" />
            <Label for="reverse">Reverse</Label>
          </Filter>
        )}
      </Nav>
    );
  }
  return <Link to="/">Please Click Here to log</Link>;
}

const Nav = styled.nav`
  display: flex;
  background-color: #191919;
  padding: 10px;
`;

const StyledLink = styled.a`
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

const Filter = styled.div``;

const Slct = styled.select`

`
const Opt = styled.option`

`

const Check = styled.input`

`

const Label = styled.label``