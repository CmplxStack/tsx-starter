import React from "react";
import { IBaseComponentProps } from "./BaseContainer";
import { Paper, Grid, Button } from "@material-ui/core";

const BaseComponent = ({
  SESSION_STORE: { welcomeMessage, genNewTodo },
  classes,
}: IBaseComponentProps) => (
  <div id="base-component-el">
    <Paper className={classes.paper}>
      <div className={classes.root}>{welcomeMessage}</div>
      <Grid container>
        <Grid item>
          <Button id="gen-todo-button" onClick={() => genNewTodo()}>
            Click Me!
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

export default BaseComponent;
