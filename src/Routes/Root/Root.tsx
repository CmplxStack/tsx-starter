import { hot } from "react-hot-loader/root";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Landing } from "@Pages/Landing";
import { NotFound } from "@Pages/NotFound";
import { AppDrawer } from "@Components/AppDrawer";

class Root extends Component {
  render() {
    return (
      <AppDrawer>
        <Switch>
          <Route exact={true} path="/" component={Landing} />
          <Route component={NotFound} />
        </Switch>
      </AppDrawer>
    );
  }
}
export default hot(Root);
