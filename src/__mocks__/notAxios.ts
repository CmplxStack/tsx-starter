import Axios from "axios";
import { CustomAxios } from "@Utils/Api/Requests/AxiosInstance";

let mockAxios = jest.genMockFromModule("../Utils/Api") as typeof CustomAxios &
  typeof Axios;
mockAxios.create = jest.fn(() => mockAxios);

mockAxios.interceptors = {
  request: { use: jest.fn(), eject: jest.fn() },
  response: { use: jest.fn(), eject: jest.fn() },
};
export default mockAxios;
