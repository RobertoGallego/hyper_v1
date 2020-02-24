import styled from 'styled-components';

const Container = styled.div`
    background: ${props => props.theme.colors.backgroungGeneral};
    display: grid;
    min-height: 90.5vh;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto 80px;
    color: ${props => props.theme.colors.textColor};
`;

const Content = styled.div`
    grid-column: 5 / span 4;

    @media (max-width: 1257px) {
        grid-column: 4 / span 6;
    }
    @media (max-width: 943px) {
        grid-column: 3 / span 8;
    }
    @media (max-width: 754px) {
        grid-column: 2 / span 10;
    }
    @media (max-width: 629px) {
        grid-column: 1 / span 12;
    }
`;

const Card = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 4vh 0 2vh 0;
    align-content: center;
    align-items: center;

    & > h3 {
        width: 75%;
        margin-top: 2vh;
    }
`;

const Hr = styled.hr`
    width: 100%;
    background-color: #ffffff;
    padding-top: 1px;
    margin: 0 0 2vh 0;
    @media (max-width: 629px) {
        width: 90%;
    }
`;

const Infos = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    width: 75%;
    color: ${props => props.theme.colors.textColor};
    & > div {
        margin: 1vh;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        & > h6 {
            margin: 1vh 0 1vh 0;
        }
    }
`;

const Img = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    -webkit-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 1);
    -moz-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 1);
`;

const Edit = styled.div`
    margin-top: 1vh;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & > * {
        margin: 1vh;
    }
`;

const Button = styled.button`
    background-color: #db202c;

    &:hover {
        background-color: #bc1e28;
    }
`;

const HyperLink = styled.a`
    color: #666;
    margin: 1vh;

    &:hover {
        color: #a4a4a4;
        text-decoration: none;
    }
`;

const Preferences = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Select = styled.select`
    background-color: #000;
    color: white;
    padding: 0.7rem;
    width: 100px;
    border: #454545 solid 1px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    -webkit-appearance: button;
    appearance: button;
    outline: none;
`;

const MainForm = styled.form`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Alert = styled.p`
    font-size: 0.8rem;
    color: #e87c03;
    margin: -1.3rem 0 1rem;
`;

const Input = styled.input`
    background-color: #454545;
    border: 0;
    border-radius: 5px;
    color: #fff;
    padding: 0.9rem 0;
    text-indent: 1rem;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 0 0 1.5rem;
    cursor: default;
    outline: 0;
    width: 100%;
    ::placeholder {
    text-align: center;
    text-indent: -0.1rem;
    }
`;

const SubForm = styled.div`
    width: 75%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & > label {
        align-self: start;
    }
    & > button {
        margin: 1vh 0 1vh 0;
    }

    @media (max-width: 629px) {
        width: 100%;
    }
`;

const Override = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Footer = styled.div`
    display: flex;
    grid-column: 1 / -1;
    background: ${props => props.theme.colors.cardBackground};
    align-items: center;
    justify-content: center;

    & > p {
        margin: 0;
        color: #A5A5A5;
    }
`;

export { 
    Container, 
    Content, 
    Card, 
    Hr, 
    Infos, 
    Img, 
    Edit, 
    Button, 
    HyperLink, 
    Preferences, 
    Select,
    MainForm, 
    Alert,
    SubForm,
    Input,
    Override,
    Footer 
}