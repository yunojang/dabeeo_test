import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Container>
      <div className="content">
        <HomeLink href="/">
          <Logo
            src="https://www.dabeeo.com/wp-content/uploads/2021/09/21_dabeeo_orange.png"
            alt="logo"
          />
        </HomeLink>
      </div>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  position: sticky;
  top: 0;
  border-bottom: 2px solid #eee;

  .content {
    max-width: 1300px;
    margin: auto;
    height: 58px;
  }
`;

const HomeLink = styled.a`
  display: inline-block;
  padding: 8px;
  padding-top: 12px;
`;

const Logo = styled.img`
  width: 96px;
  height: auto;
  cursor: pointer;
`;
