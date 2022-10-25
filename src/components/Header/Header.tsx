import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <h1>Notepad plus+</h1>
    </Container>
  );
}

const Container = styled.div`
  height: 80px;
  padding: 0 30px;
  background: #7159c1;
  color: #fff;
  display: flex;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export default Header;
