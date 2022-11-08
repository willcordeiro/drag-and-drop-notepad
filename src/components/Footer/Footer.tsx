import React from "react";
import styled from "styled-components";
import { AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

function Footer() {
  return (
    <Container>
      <footer>
        <ul className="icons">
          <li>
            <a
              href="https://www.linkedin.com/in/william-cordeiro-568229238/"
              target="blank"
            >
              <AiFillLinkedin />
            </a>
          </li>
          <li>
            <a
              href="mailto:willcordeiro800@gmail.com?subject=Hello%20again"
              target="blank"
            >
              <AiOutlineMail />
            </a>
          </li>
          <li>
            <a href="https://github.com/willcordeiro" target="blank">
              <GoMarkGithub />
            </a>
          </li>
        </ul>
        <div className="footer-copyright">
          <p>William Cordeiro @ 2022 All Rights Reserved.</p>
        </div>
      </footer>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  a {
    text-decoration: none;
  }

  footer {
    background-color: #272727;
    text-align: center;
    text-transform: uppercase;
    padding-top: 5px;
    margin-top: 300px;
  }

  footer li {
    list-style: none;
    margin: 10px;
    display: inline-block;
  }

  .icons a {
    background: #e9e0d4;
    color: black;
    padding: 14px;
    font-size: 20px;
    border-radius: 100%;
    display: flex;
  }

  .icons a:hover {
    background: #ff4655;
    transition: 0.5s;
    color: white;
  }

  .menu a {
    color: #ffffff;
    text-transform: capitalize;
    cursor: pointer;
  }
  .menu a:hover {
    color: var(--color-primary);
    transition: 0.5s;
  }

  .footer-copyright {
    background-color: #292841;
    color: #ffffff;
    padding: 15px;
    margin-top: 30px;
    text-transform: capitalize;
  }

  .footer-copyright p {
    margin-bottom: 0px;
  }
`;
