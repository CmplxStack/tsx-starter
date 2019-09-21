import React from "react";
import { ReactWrapper, mount } from "enzyme";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Provider } from "mobx-react";
import { BaseComponent } from "@Components";
import { RootStore } from "@Models/RootStore";
import { CustomAxiosRequests } from "@Utils/Api";
import { MockTodoResponse } from "@Helpers";
import {
  onPatch,
  getSnapshot,
  IJsonPatch,
  onSnapshot,
  ModelSnapshotType,
  applySnapshot,
  applyPatch,
} from "mobx-state-tree";
import Axios from "axios";
import { CustomAxiosInstance } from "@Utils/Api/AxiosInstance";

jest.mock("@Utils/Api/AxiosInstance");

let mockedAxios = CustomAxiosInstance as jest.Mocked<typeof Axios>;

describe("Base Component Element Tests", () => {
  let fullWrapper: ReactWrapper;
  let baseComponent: ReactWrapper;

  const ROOT_STORE = RootStore.create({}, { CustomAxiosRequests });
  const theme = createMuiTheme({});

  let RootComponent = () => (
    <Provider {...ROOT_STORE}>
      <ThemeProvider theme={theme}>
        <BaseComponent />
      </ThemeProvider>
    </Provider>
  );
  beforeAll(() => {
    fullWrapper = mount(<RootComponent />);
    baseComponent = fullWrapper.find("#base-component-el");
  });
  afterAll(() => {
    fullWrapper.unmount();
  });
  test("should render parent component with id `base-component-el", () => {
    expect(baseComponent).toExist();
  });

  test("should render a button element with id `gen-todo-btn`", () => {
    let genTodoButton = baseComponent.find("#gen-todo-button");
    expect(genTodoButton).toExist();
  });
  test("should render a message element with id `message-element`", () => {
    let messageElement = baseComponent.find("#message-el");
    expect(messageElement).toExist();
  });
});

describe("Base tests", () => {
  let fullWrapper: ReactWrapper;
  mockedAxios.get.mockResolvedValue({ data: MockTodoResponse });
  let axiosGetSpy = jest.spyOn(CustomAxiosInstance, "get");

  test("should have SESSION_STORE and classes as props", () => {
    const ROOT_STORE = RootStore.create({}, { CustomAxiosRequests });
    const theme = createMuiTheme({});

    let RootComponent = () => (
      <Provider {...ROOT_STORE}>
        <ThemeProvider theme={theme}>
          <BaseComponent />
        </ThemeProvider>
      </Provider>
    );
    fullWrapper = mount(<RootComponent />);
    let baseComponent = fullWrapper.find("BaseComponent");
    expect(baseComponent).toExist();
    expect(baseComponent).toHaveProp("SESSION_STORE");
    expect(baseComponent).toHaveProp("classes");
    fullWrapper.unmount();
  });

  test("Button onClick calls Axios and updates mobx state", async () => {
    let patches: IJsonPatch[] = [];
    let snapshots: ModelSnapshotType<any>[] = [];

    const ROOT_STORE = RootStore.create({}, { CustomAxiosRequests });
    const theme = createMuiTheme({});

    let RootComponent = () => (
      <Provider {...ROOT_STORE}>
        <ThemeProvider theme={theme}>
          <BaseComponent />
        </ThemeProvider>
      </Provider>
    );

    fullWrapper = mount(<RootComponent />);

    onSnapshot(ROOT_STORE, (snapshot) => {
      snapshots.push(snapshot);
    });
    onPatch(ROOT_STORE, (patch) => {
      patches.push(patch);
    });

    let baseComponent = fullWrapper.find("BaseComponent");
    expect(baseComponent).toExist();
    let genTodoButton = await baseComponent.find("#gen-todo-button").find("button");
    expect(genTodoButton).toExist();
    let messageElement = baseComponent.find("#message-el");
    expect(messageElement).toExist();
    expect(messageElement).toHaveText("Welcome!");
    await genTodoButton.simulate("click");

    await expect(axiosGetSpy).toHaveBeenCalled();

    await getSnapshot(ROOT_STORE);
    await expect(ROOT_STORE).toMatchSnapshot();
    // or.....
    // await expect(await getSnapshot(ROOT_STORE)).toMatchSnapshot();
    expect(patches).toMatchSnapshot();
    expect(snapshots).toMatchSnapshot();
    // must be after expect(ROOT_STORE).toMatchSnapshot();
    expect(messageElement).toHaveText(MockTodoResponse.title);

    fullWrapper.unmount();
  });
});
