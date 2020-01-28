import React from "react";
import styled from "styled-components";
import Header from "../general/Header";
import Footer from "../general/Footer";
import ModifyPasswordCard from "./ModifyPasswordCard";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default function ModifyPassword() {
  return (
    <Container>
      <Header />
      <ModifyPasswordCard />
      <Footer />
    </Container>
  );
}
