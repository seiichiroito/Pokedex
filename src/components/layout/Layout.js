import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Pokedex</title>
        <meta
          name="description"
          content="Pokedex - Search your favorite Pokemon"
        />

        {/* Twitter */}
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;
