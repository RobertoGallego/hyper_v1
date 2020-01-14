import React from 'react';
import styled from 'styled-components';

export default function Com() {
    return (
        <Comment>
            <OldCom><b>UserName:</b> <br/><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </OldCom>
            <NewCom>
                <Form>
                    <Input
                        type="text"
                        name="CommentInput"
                        placeholder="Add a Comment"
                        // onChange={this.handleInputChange} 
                    />
                    <Send
                        type="submit"
                        name="Send"
                        value="Send"
                    />
                </Form>
            </NewCom>
        </Comment>
    );
}

const Comment = styled.div`
    text-align:left;
    padding: 0 2em;
`

const OldCom = styled.div`
border: 1px solid #fff;
margin-bottom: 2em;
padding: 1em;
background: #696969;
`

const NewCom = styled.div`
    margin: 0 auto;
`

const Form = styled.div`
`

const Input = styled.input`
    width: 40vmin;
    margin:0.5em 3em;
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

const Send = styled.input`
    background: #fff;
    color: #000;
    border: 1px solid #fff;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding: 1em 1.5em;
    letter-spacing: 2px;
    cursor: pointer;
    font-size: .9em;
    margin-right: 2em;
`