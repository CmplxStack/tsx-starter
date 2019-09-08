import { types, Instance } from "mobx-state-tree";

export const Session = types
  .model({
    name: types.maybe(types.string),
    welcomeMessage: "Loading...",
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
      self.welcomeMessage = message;
    },
  }))
  .actions((self) => ({
    afterCreate() {
      let msg = "TS | React | Starter";
      // Timeout to show proof of afterCreate;
      setTimeout(() => self.updateWelcomeMessage(msg), 2000);
    },
  }));

export type ISessionStoreInstance = Instance<typeof Session>;
