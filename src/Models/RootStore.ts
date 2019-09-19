import {
  types,
  Instance,
  SnapshotOut,
  SnapshotIn,
} from "mobx-state-tree";
import { Session } from "./Session";
import { SESSION_STORE } from "@Shared/Constants/Models";

const RootStore = types.model({
  [SESSION_STORE]: types.optional(Session, {}),
});
export interface IRootStoreInstance
  extends Instance<typeof RootStore> {}
export interface IRootStoreSnapshotOut
  extends SnapshotOut<typeof RootStore> {}
export interface IRootStoreSnapshotIn
  extends SnapshotIn<typeof RootStore> {}
export { RootStore };
