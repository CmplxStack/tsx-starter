import React from "react";
import { BaseComponent } from "@Components";
import { ReactWrapper, mount } from "enzyme";
import { Provider } from "mobx-react";
import rootStore from "@Models/RootStore";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import MockAdapter from "axios-mock-adapter";
import { CustomAxios } from "@Utils/Api/Requests/AxiosInstance";
// import mockAxios from "axios";

const ROOT_STORE = rootStore.create();
const theme = createMuiTheme({});

describe("Base tests", () => {
  let fullWrapper: ReactWrapper;
  jest.spyOn(CustomAxios, "get");
  let mockAxios = new MockAdapter(CustomAxios);
  mockAxios.onGet().reply(200, { title: "Mock Title" });

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

  test("should have called `get` one time with axios", () => {
    expect(CustomAxios.get).toHaveBeenCalledTimes(1);
  });
});

// Top of describe
// const spy = jest.spyOn(CustomAxios, "get");

// Mocked within __mocks__ folder.....
// mockAxios.get = jest
//   .fn()
//   .mockImplementation(() => Promise.resolve({ data: { title: "What" } }));
// mockAxios.get = jest
//   .fn()
//   .mockImplementation(() => Promise.resolve({ data: { title: "What" } }));
