import React from "react";
import { ReactWrapper, mount } from "enzyme";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "mobx-react";
import { BaseComponent } from "@Components";
import rootStore from "@Models/RootStore";
import { CustomAxiosRequests } from "@Utils/Api";
import {
  MockTodoResponse,
  createMockAxios,
  createAxiosGetSpy,
} from "@Helpers";

const ROOT_STORE = rootStore.create({}, { CustomAxiosRequests });
const theme = createMuiTheme({});

let mockAxios = createMockAxios();

let axiosGetSpy = createAxiosGetSpy();

let RootComponent = () => (
  <Provider {...ROOT_STORE}>
    <ThemeProvider theme={theme}>
      <BaseComponent />
    </ThemeProvider>
  </Provider>
);

describe("Base Component Element Tests", () => {
  let fullWrapper: ReactWrapper;

  beforeAll(() => {
    fullWrapper = mount(<RootComponent />);
  });
  afterAll(() => {
    fullWrapper.unmount();
  });
  test("should render parent component with id `base-component-el", () => {
    let baseComponent = fullWrapper.find("#base-component-el");
    expect(baseComponent).toExist();
  });

  test("should render a button element with id `gen-todo-btn`", () => {
    let baseComponent = fullWrapper.find("#base-component-el");
    expect(baseComponent).toExist();
    let genTodoButton = baseComponent.find("#gen-todo-button");
    expect(genTodoButton).toExist();
  });
});

describe("Base tests", () => {
  let fullWrapper: ReactWrapper;

  beforeAll(() => {
    fullWrapper = mount(<RootComponent />);
    mockAxios.onGet().reply(200, MockTodoResponse);
  });
  afterAll(() => {
    fullWrapper.unmount();
    mockAxios.reset();
  });
  test("should have SESSION_STORE and classes as props", () => {
    let baseComponent = fullWrapper.find("BaseComponent");
    expect(baseComponent).toExist();
    expect(baseComponent).toHaveProp("SESSION_STORE");
    expect(baseComponent).toHaveProp("classes");
  });

  test("Click button should call axios get", async () => {
    let baseComponent = fullWrapper.find("BaseComponent");
    expect(baseComponent).toExist();
    let genTodoButton = baseComponent
      .find("#gen-todo-button")
      .find("button");
    expect(genTodoButton).toExist();
    await genTodoButton.simulate("click");
    await expect(axiosGetSpy).toHaveBeenCalled();
    // expect(mockAxios.history.get).toBe([]);
  });
});
