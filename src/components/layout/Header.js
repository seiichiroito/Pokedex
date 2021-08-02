import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyled>
      <p>Pokedex</p>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  padding: 1rem 0;
  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);

  p {
    font-size: 2em;
    text-align: center;
    color: #f3f3f3;
  }
`;

export default Header;
