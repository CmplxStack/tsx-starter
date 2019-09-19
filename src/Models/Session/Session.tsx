import { types, Instance, getEnv, flow } from "mobx-state-tree";
import { ICustomAxiosRequests } from "@Utils/Api";
import { AxiosResponse } from "axios";
import { IGetTodo } from "@Utils/Api/Requests";

interface ISessionEnv {
  CustomAxiosRequests: ICustomAxiosRequests;
}
export const Session = types
  .model({
    sessionName: types.maybe(types.string),
    welcomeMessage: types.optional(types.string, "Welcome!"),
    isLoading: types.optional(
      types.enumeration("State", ["pending", "done", "error"]),
      "pending",
    ),
  })
  .views((self) => ({
    get loadingStatus() {
      return self.isLoading;
    },
  }))
  .actions((self) => ({
    updateStatus(newStatus: typeof self.isLoading) {
      self.isLoading = newStatus;
    },
    updateWelcomeMessage(message: string) {
      self.welcomeMessage = message;
    },
  }))
  .actions((self) => ({
    genNewTodo: flow(function* genNewTodo() {
      self.updateStatus("pending");
      try {
        // console.log("Starting Flow --- genNewTodo");
        let num = Math.floor(Math.random() * 200);
        // console.log("Calling getTodoById(num)--- with num:", num);

        const callResponse: AxiosResponse<IGetTodo> = yield getEnv<
          ISessionEnv
        >(self).CustomAxiosRequests.getTodoById(num);

        const { data } = callResponse;
        // self.welcomeMessage = data.title;
        self.updateWelcomeMessage(data.title);
        // console.log("Finished Flow --- genNewTodo");
        self.updateStatus("done");
      } catch (error) {
        // ... including try/catch error handling
        console.error("Failed to fetch todo", error);
        self.updateStatus("error");
      }
    }),
  }));

export type ISessionStoreInstance = Instance<typeof Session>;
