import React from "react";
import { FiCoffee } from "react-icons/fi";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <h1>
        Cat Notepad <FiCoffee />{" "}
      </h1>
    </Container>
  );
}

const Container = styled.div`
  height: 80px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
`;

export default Header;
