import styled from "styled-components";

export const Container = styled.div`
  flex-grow: 1;
  background-color: #ffffff;
`;

export const CardBox = styled.div`
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

export const CardBot = styled.div`
  background-color: #101010;
  border-radius: 7px;
`;

export const Button = styled.button`
  background-color: #db202c;

  &:hover {
    background-color: #bc1e28;
  }
`;

export const HyperLink = styled.a`
  color: #a5a5a5;

  &:hover {
    color: #cdcdcd;
    text-decoration: none;
  }
`;

export const Loading = styled.h3`
  color: #000000;
`;

export const Input = styled.input`
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

export const Alert = styled.p`
  font-size: 0.8rem;
  color: #e87c03;
  margin: -1.3rem 0 1rem;
`;
