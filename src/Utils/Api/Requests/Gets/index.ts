import { CustomAxios } from "../AxiosInstance";

export const getTodoById = async (id: number) => {
  const response = await CustomAxios.get(`/todos/${id}`);
  return response;
};
