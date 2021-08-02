import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <p>Pokedex {new Date().getFullYear()} © All Right Reserved.</p>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  padding: 0.5rem 0;
  background-color: #424242;
  p {
    font-size: 0.875rem;
    color: #f5f5f5;
    text-align: center;
  }
`;

export default Footer;
