import React, {useState} from 'react';
import styled from 'styled-components';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function Com(movieID) {

    const [bodyCom, setBodyCom] = useState("");

    const commentChange = e => {
        setBodyCom(e.target.value);
    }


    const FETCH_COMMENTS = gql`
        query getComments($movId: String!){
            getComments(movieId: $movId){
                id
                username
                body
                movieId
                createdAt
            }
        }
    `

    const ADD_COMMENT = gql`
        mutation addComment($id: String!, $text: String!){
            addComment(movieId: $id, body: $text){
                id
                body
                username
                createdAt
                movieId
            }
        }
    `
    const [addCom] = useMutation(ADD_COMMENT);

    const sendComment = () => {
            addCom({variables : {id : movieID.movie, text: bodyCom}});
    }

    const comRes = useQuery(FETCH_COMMENTS, {variables : {movId : movieID.movie}});
    const comments = comRes.data.getComments;

    
    console.log(comRes);
    

    if(!comments){
        return (
            <Comment>
                <NoCom> No Comments</NoCom>
                <NewCom>
                    <Form>
                        <Input onChange={commentChange} type="text" name="CommentInput" placeholder="Add a Comment" />
                        <Send onClick={sendComment} type="submit" name="Send" value="Send" />
                    </Form>
                </NewCom>
            </Comment>
        );
    }
    return (
        <Comment>
            <OldCom><b>UserName:</b> <br/><br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </OldCom>
            <NewCom>
                <Form>
                <Form>
                        <Input onChange={commentChange} type="text" name="CommentInput" placeholder="Add a Comment" />
                        <Send onClick={sendComment} type="submit" name="Send" value="Send" />
                    </Form>
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

const NoCom = styled.h3`
    text-align: center;
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