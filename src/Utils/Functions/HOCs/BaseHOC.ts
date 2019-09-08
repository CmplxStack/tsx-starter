import { inject, observer, IReactComponent } from "mobx-react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { withRouter } from "react-router";
import { VALID_STORE } from "@Shared/Typings/interfaces";
import { ComponentType } from "react";

type IBaseComponent = ComponentType | IReactComponent;

export const BaseHOC = (
  theme: boolean,
  router: boolean,
  styles: any,
  component: IBaseComponent,
  stores?: VALID_STORE[],
) => {
  if (stores) {
    if (router) {
      return compose<any, any>(
        withStyles(styles, { withTheme: theme }),
        inject(...stores),
        observer,
      )(component);
    } else {
      return compose<any, any>(
        withStyles(styles, { withTheme: theme }),
        inject(...stores),
        observer,
      )(component);
    }
  }

  // Needs to add inject/observe
  if (router) {
    return compose<any, any>(
      withRouter,
      withStyles(styles, { withTheme: theme }),
    )(component);
  } else {
    return withStyles(styles, { withTheme: theme })(component);
  }
};
