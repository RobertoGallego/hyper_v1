import React from 'react';
import styled from 'styled-components';
import Header from '../general/Header';
import Footer from '../general/Footer';

export default function Edit() {
    return (
        <EditProfile>
            <Header/>
                <Content>
                    <Title>Edit profile</Title>
                    <HR/>
                    <form>
                        <Top>
                            <Left>
                                <Picture src={process.env.PUBLIC_URL + '/img/profilePic1.png'}/>
                                <Square>
                                    <SmallPic src={process.env.PUBLIC_URL + '/img/profilePic1.png'} alt="Profile Pic 1"/>
                                    <SmallPic src={process.env.PUBLIC_URL + '/img/profilePic2.png'} alt="Profile Pic 2"/>
                                    <SmallPic src={process.env.PUBLIC_URL + '/img/profilePic3.png'} alt="Profile Pic 3"/>
                                    <SmallPic src={process.env.PUBLIC_URL + '/img/profilePic4.png'} alt="Profile Pic 4"/>
                                </Square>
                            </Left>
                            <Right>
                                <Text>state.username</Text>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        // value={this.state.firstName || ''}
                                        placeholder="First name"
                                        // onChange={this.handleInputChange} 
                                    />
                                    <Input
                                            type="text"
                                            name="LastName"
                                            // value={this.state.lastName || ''}
                                            placeholder="Last name"
                                            // onChange={this.handleInputChange} 
                                        />
                                <Text>New Password: </Text>
                                    <Input
                                            type="text"
                                            name="NewPassword"
                                            placeholder="New Password"
                                            // onChange={this.handleInputChange} 
                                        />
                                <Text>Confirmation: </Text>
                                    <Input
                                            type="text"
                                            name="NewPC"
                                            placeholder="Confirmation"
                                            // onChange={this.handleInputChange} 
                                        />
                            </Right>
                        </Top>
                        <hr/>
                        <Bottom>
                            <Save
                                type="submit"
                                name="Save"
                                value="Save"
                            />
                            <Cancel
                                name="Cancel"
                                value="Cancel"
                            />
                        </Bottom>
                    </form>
                </Content>
            <Footer/>
        </EditProfile>
    );
}

const EditProfile = styled.div`
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    background-color: #111111;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    display: flex;
    min-height: 100vh;
    flex-direction: column;
    color: white;
`
const Top = styled.div`
    display: flex;
`

const HR = styled.hr`
    border: 1px solid white;
`

const Left = styled.div`
    margin: 1em auto;
`
const Square = styled.div`
    width: 20vmin;
    margin: 1em 0;
` 

const Right = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em auto;
`
const Bottom = styled.div`
    display: flex;
    justify-content: center;
    margin: 1em auto;
`
const Save = styled.input`
    background: #fff;
    color: #000;
    border: 1px solid #fff;
    font-weight: bold;
    text-transform: uppercase;
    padding: .5em 1.5em;
    letter-spacing: 2px;
    cursor: pointer;
    font-size: .9em;
    margin-right: 2em;
`
const Cancel = styled.input`
    background: #111;
    color: #666;
    border: 1px solid #666;
    text-transform: uppercase;
    padding: .5em 1.5em;
    letter-spacing: 2px;
    cursor: pointer;
    font-size: .9em;
    text-align: center;
`

const Input = styled.input`
    width: 20vmin;
    margin:0.5em auto;
    background: #666666;
    border: none;
    padding: 1em;
    color: white;
    font-size: 1em;
    ::placeholder,
    ::-webkit-input-placeholder {
    color: white;
    font-size: 1em;
  }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vmin;
    margin: 0 auto;
`

const Title = styled.h1`
font-size: 5em;
`;

const Picture = styled.img`
width: 20vmin;
height: 20min;
margin: 0 auto;
`;

const SmallPic = styled.img`
width: 10vmin;
height: 10min;
margin: 0 auto;
cursor: pointer;
`;

const Text = styled.span`
text-align: center;
margin: 30px 0;
font-size: 1.5em;
`;