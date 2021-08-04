import { ThemeProvider } from "styled-components";
import { Route, Switch } from "react-router-dom";
import { theme } from "./css/style";

import Pokedex from "./pages/Pokedex";
// import Pokemon from "./pages/Pokemon";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={Pokedex} />
        {/* <Route path="/:name" component={Pokemon} /> */}
      </Switch>
    </ThemeProvider>
  );
};

export default App;
