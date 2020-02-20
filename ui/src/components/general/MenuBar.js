import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/hyperlogo.png";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import logoSearch from "../../assets/images/lupsearch.png";

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
            <Menubar>
                <Link to="/">
                <Pict src={logoTop} alt="Hypertube" />
                </Link>
                <StyledLinka href="/">{t('header.home')}</StyledLinka>
                <StyledLink href="/profile">{t('header.profile')}</StyledLink>
                <StyledLink onClick={logout} href="/login">
                {t('header.logout')}
                </StyledLink>
            </Menubar>
            <Searchbar>
                {isHome && (
                <Bar>
                    <Input
                        onChange={searchChange}
                        value={textState}
                        name="search"
                        placeholder={t('header.search')}
                    />
                    <Search 
                        type="image"
                        src={logoSearch}
                        alt="Submit"
                        onClick={sendSearch}> 
                        {/* {t('header.search')} */}
                    </Search>
                </Bar>)}
            </Searchbar>
        {isHome && (
          <Filter>
            <Slct onChange={genreChange}>
              <Opt value="">{t('genre')}</Opt>
              <Opt value="action">{t('action')}</Opt>
              <Opt value="adventure">{t('adventure')}</Opt>
              <Opt value="animation">{t('animation')}</Opt>
              <Opt value="comedy">{t('comedy')}</Opt>
              <Opt value="crime">{t('crime')}</Opt>
              <Opt value="documentary">{t('documentary')}</Opt>
              <Opt value="drama">{t('drama')}</Opt>
              <Opt value="fantasy">{t('fantasy')}</Opt>
              <Opt value="history">{t('history')}</Opt>
              <Opt value="horror">{t('horror')}</Opt>
              <Opt value="sci-fi">{t('sci-fi')}</Opt>
              <Opt value="thriller">{t('thriller')}</Opt>
              <Opt value="war">{t('war')}</Opt>
              <Opt value="western">{t('western')}</Opt>
            </Slct>
            <Slct onChange={sortChange}>
              <Opt value="rating">{t('rating')}</Opt>
              <Opt value="year">{t('year')}</Opt>
              <Opt value="title">{t('title')}</Opt>
              <Opt value="peers">{t('peers')}</Opt>
            </Slct>
            <Check onChange={reverseChange} type ="checkbox" name="reverse"/>
            <Label htmlFor="reverse">{t('reverse')}</Label>
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

const Menubar = styled.div`
`

const Searchbar = styled.div`
  justify-content: center;
`;

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
  font-size: 1rem;
  color: ${props => props.theme.colors.textColor};
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

const Filter = styled.div``;

const Slct = styled.select`

`
const Opt = styled.option`

`

const Check = styled.input`

`

const Label = styled.label``
