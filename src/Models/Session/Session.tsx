import { types, Instance } from "mobx-state-tree";

export const Session = types
  .model({
    name: types.maybe(types.string),
    welcomeMessage: "Welcome...",
    is_done: types.optional(types.boolean, false),
  })
  .volatile((self) => ({}))
  .views((self) => ({
    status() {
      return self.is_done ? "Done" : "Not Done";
    },
  }))
  .actions((self) => ({
    markDone() {
      self.is_done = true;
    },
    updateWelcomeMessage(message: string) {
      console.log("message:", message);
      self.welcomeMessage = message;
    },
  }))
  .actions((self) => ({}));

export type ISessionStoreInstance = Instance<typeof Session>;
