import React from "react";
import { BaseComponent } from "@Components";
import { ReactWrapper, mount } from "enzyme";
import { Provider } from "mobx-react";
import rootStore from "@Models/RootStore";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const ROOT_STORE = rootStore.create();
const theme = createMuiTheme({});

describe("Base tests", () => {
  let fullWrapper: ReactWrapper;

  beforeAll(() => {
    fullWrapper = mount(
      <Provider {...ROOT_STORE}>
        <ThemeProvider theme={theme}>
          <BaseComponent />
        </ThemeProvider>
      </Provider>,
    );
  });

  test("should have SESSION_STORE and classes as props", () => {
    let baseComponent = fullWrapper.find("BaseComponent");
    expect(baseComponent).toExist();
    expect(baseComponent).toHaveProp("SESSION_STORE");
    expect(baseComponent).toHaveProp("classes");
  });
});
