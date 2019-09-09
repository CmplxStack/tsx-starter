import Axios, { AxiosInstance } from "axios";

const isDev = process.env.NODE_ENV === "development" || "test";

const generateAxiosInstance = () => {
  let AxiosConfig = isDev
    ? require("../Configs/MockConfig").default
    : require("../Configs/ProdConfig").default;

  let tempAxiosInstance = Axios.create(AxiosConfig);

  tempAxiosInstance.interceptors.request.use(
    (request) => {
      //something
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );
  tempAxiosInstance.interceptors.response.use(
    (response) => {
      //something
      if (response.status === 200) {
        return response.data;
      }
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    },
  );
  return tempAxiosInstance;
};

let CustomAxios: AxiosInstance = generateAxiosInstance();

export { CustomAxios };
