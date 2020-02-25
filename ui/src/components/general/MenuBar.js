import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { AuthContext } from "../../context/auth";
import logoTop from "../../assets/images/hyperlogo.png";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import logoSearch from "../../assets/images/lupsearch.png";

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
    console.log("ok");
    // setTextState(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "Asc") {
        console.log("if: " + e.target.value);
      setReverseState("asc");
    }
    else {
        console.log("else: " + e.target.value);
        setReverseState("desc");
    }
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
        <Menus>
            <Link to="/">
                <Pict src={logoTop} alt="Hypertube" />
            </Link>
            <StyledLinka href="/">{t('header.home')}</StyledLinka>
            <StyledLink href="/profile">{t('header.profile')}</StyledLink>
            <StyledLink onClick={logout} href="/login">{t('header.logout')}</StyledLink>
        </Menus>
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
            <Slct onChange={reverseChange}>
                <Opt value="Asc">Sort by: Asc</Opt>
                <Opt value="Desc">Sort by: Desc</Opt>
            </Slct>
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
            {/* <Label><Check onChange={reverseChange} type ="checkbox" name="reverse"/>{t('reverse')}</Label> */}
        </Filter>
        )}
      </Nav>
    );
  }
  return <Link to="/">Please Click Here to log</Link>;
}

const Nav = styled.nav`
  /* width: 90%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  /* background-color: #191919; */
  background: ${props => props.theme.colors.cardBackground};
  @media (max-width: 768px) {
      justify-content: center;
    }
  padding: 1rem 3.5rem;
`;

const Searchbar = styled.div`
  justify-content: center;
  margin-left: 1rem;
  @media (max-width: 768px) {
    margin-left: 0rem;
    }
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
      margin: 0 auto;
    }
`;

const Pict = styled.img`
  margin: 1rem 0 1rem 1rem;
  cursor: pointer;
  @media (max-width: 768px) {
      width: 250px;
      height: 75px;
      margin: 1rem auto;
    }
`;

const Bar = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    @media (max-width: 768px) {
        margin-top: 1rem;
        /* margin-left: 1rem; */
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
  @media (max-width: 768px) {
      width: 100%;
    }
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

const Filter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen  
    and (max-width: 1470px)  {
        /* margin-top: 1.5rem; */
    }
    @media (max-width: 768px) {

        flex-direction: column;
        flex-wrap: wrap;
    }
`;

const Slct = styled.select`
    width: 150px;
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
    margin-left: 1rem;
    @media (max-width: 768px) {
        width: 250px;
        height: 50px;
        margin: 0.5rem 0rem;
    }
`
const Opt = styled.option`
`

const Menus = styled.div`
@media (max-width: 768px) {
      text-align: center;
      justify-content: center;
    }
`