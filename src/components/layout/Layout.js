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
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@seiichiro_ito" />
        <meta name="twitter:url" content="https://sei-pokedex.vercel.app/" />
        <meta name="twitter:title" content="Pokedex" />
        <meta
          name="twitter:description"
          content="Pokedex - Search your favorite Pokemon"
        />
        <meta
          name="twitter:image"
          content="https://sei-pokedex.vercel.app/hero.png"
        />
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;
