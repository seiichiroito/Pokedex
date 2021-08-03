import styled from "styled-components";
import { AiOutlineGithub } from "react-icons/ai";
const Header = () => {
  return (
    <HeaderStyled>
      <p>Pokedex</p>
      <a
        href="https://github.com/seiichiroito/Pokedex"
        target="_blank"
        rel="noreferrer"
      >
        <AiOutlineGithub />
      </a>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  padding: 1rem 0;
  background: linear-gradient(to right, #f12711, #f5af19);

  /* background: linear-gradient(to right, #0f2027, #203a43, #2c5364); */
  position: relative;
  p {
    font-size: 2em;
    text-align: center;
    color: #f3f3f3;
  }
  svg {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    color: #f3f3f3;
  }
`;

export default Header;
