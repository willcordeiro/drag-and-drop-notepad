import React, { useState } from "react";
import { FiCoffee } from "react-icons/fi";
import styled from "styled-components";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";

function Header({ themeToggler, themeMode }: any) {
  return (
    <Container>
      <h1>
        Cat Notepad <FiCoffee />
      </h1>
      <ThemeMode onClick={() => themeToggler()}>
        {themeMode === "light" ? <BiSun /> : <BiMoon />}
      </ThemeMode>
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
  justify-content: space-between;
`;

const ThemeMode = styled.div`
  font-size: 2rem;
  cursor: pointer;

  :hover {
    background-color: #8a43f2;
    border-radius: 50px;
    color: white;
  }
`;

export default Header;
