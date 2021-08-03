import React from "react";
import Pokedex from "./pages/Pokedex";
import { theme } from "./css/style";

import { ThemeProvider } from "styled-components";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Pokedex />
    </ThemeProvider>
  );
};

export default App;
