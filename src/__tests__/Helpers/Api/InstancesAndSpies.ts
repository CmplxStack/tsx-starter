import MockAdapter from "axios-mock-adapter";
import { CustomAxiosInstance } from "@Utils/Api/AxiosInstance";
import Axios from "axios";

export const createMockAxios = () =>
  new MockAdapter(CustomAxiosInstance);

export const createAxiosGetSpy = () =>
  jest.spyOn(CustomAxiosInstance, "get");
export const createAxiosPostSpy = () =>
  jest.spyOn(CustomAxiosInstance, "post");
export const createAxiosPutSpy = () =>
  jest.spyOn(CustomAxiosInstance, "put");
export const createAxiosDeleteSpy = () =>
  jest.spyOn(CustomAxiosInstance, "delete");
