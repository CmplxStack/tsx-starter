import { AxiosResponse } from "axios";
import { CustomAxiosInstance } from "../../AxiosInstance";

export interface IGetTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const getTodoById: (
  id: number,
) => Promise<AxiosResponse<IGetTodo>> = async (id: number) => {
  return await CustomAxiosInstance.get(`/todos/${id}`);
};
export type IGetTodoById = typeof getTodoById;
