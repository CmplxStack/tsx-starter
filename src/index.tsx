import "react-hot-loader";
import React, { ComponentType } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import makeInspectable from "mobx-devtools-mst";
import { Provider } from "mobx-react";
import { Root } from "@Routes";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { RootStore } from "@Models/RootStore";
import { green, deepOrange } from "@material-ui/core/colors";
import { CustomAxiosRequests } from "@Utils/Api";
import { actionLogger } from "mst-middlewares";
import { addMiddleware } from "mobx-state-tree";

const ROOT_STORE = RootStore.create(
  {},
  {
    CustomAxiosRequests,
  },
);

addMiddleware(ROOT_STORE, actionLogger);

makeInspectable(ROOT_STORE);
const theme = createMuiTheme({
  // Add theme/palette Options
  palette: { type: "dark", primary: green, secondary: deepOrange },
});

const renderApp = (Root: ComponentType) => {
  ReactDOM.render(
    <Provider {...ROOT_STORE}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Root />
        </Router>
      </ThemeProvider>
    </Provider>,
    document.getElementById("root"),
  );
};

renderApp(Root);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
