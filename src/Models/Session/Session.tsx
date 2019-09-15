import { types, Instance, getEnv } from "mobx-state-tree";
import { flow } from "mobx";
import { ICustomAxiosRequests } from "@Utils/Api";

interface ISessionEnv {
  CustomAxiosRequests: ICustomAxiosRequests;
}

export const Session = types
  .model({
    name: types.maybe(types.string),
    welcomeMessage: types.optional(types.string, "Welcome!"),
    is_done: types.optional(types.boolean, false),
  })
  .views((self) => ({
    status() {
      return self.is_done ? "Done" : "Not Done";
    },
    get webClient() {
      return getEnv<ISessionEnv>(self).CustomAxiosRequests;
    },
  }))
  .actions((self) => ({
    markDone() {
      self.is_done = true;
    },
    updateWelcomeMessage(message: string) {
      self.welcomeMessage = message;
    },
  }))
  .actions((self) => ({
    genNewTodo: flow(function* genNewTodo() {
      try {
        console.log("Starting Flow --- genNewTodo");
        let num = Math.floor(Math.random() * 200);
        console.log("Calling getTodoById(num)--- with num:", num);

        const callResponse = yield self.webClient.getTodoById(num);

        const { data } = callResponse;

        self.updateWelcomeMessage(data.title);

        console.log("Finished Flow --- genNewTodo");
      } catch (error) {
        // ... including try/catch error handling
        console.error("Failed to fetch todo", error);
      }
    }),
  }));

export type ISessionStoreInstance = Instance<typeof Session>;
