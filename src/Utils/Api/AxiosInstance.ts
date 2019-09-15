import Axios from "axios";

const isDev = process.env.NODE_ENV === "development" || "test";

const generateAxiosInstance = () => {
  let AxiosConfig = isDev
    ? require("./Configs/MockConfig").default
    : require("./Configs/ProdConfig").default;

  let tempAxiosInstance = Axios.create(AxiosConfig);
  tempAxiosInstance.interceptors.request.use(
    (request) => {
      //something
      console.log("Request:", request);
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  tempAxiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return tempAxiosInstance;
};

let CustomAxiosInstance = generateAxiosInstance();

export type ICustomAxiosInstance = typeof CustomAxiosInstance;

export { CustomAxiosInstance };
