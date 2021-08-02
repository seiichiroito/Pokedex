import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const LayoutStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
  }
`;
const Layout = ({ children }) => {
  return (
    <LayoutStyled>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;
