import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  flex-grow: 1;
`;

export const Button = styled.button`
  background-color: #db202c;

  &:hover {
    background-color: #bc1e28;
  }
`;

export const HyperLink = styled(Link)`
  color: #666;

  &:hover {
    color: #a4a4a4;
    text-decoration: none;
  }
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

export const Img = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  margin: auto;
  -webkit-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 1);
`;

export const Hr = styled.hr`
  padding: 1px;
  background-color: #ffffff;
`;

export const Select = styled.select`
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
