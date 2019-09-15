import * as Models from "@Shared/Constants/Models";
import { ComponentType } from "react";
import { IReactComponent } from "mobx-react";

export type VALID_STORE = keyof typeof Models;
export type IBaseComponentType<T> =
  | ComponentType<T>
  | IReactComponent<T>;
