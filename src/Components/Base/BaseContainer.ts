import { SESSION_STORE } from "@Shared/Constants/Models";
import { IBaseComponentType } from "@Shared/Typings";
import { WithStyles } from "@material-ui/styles";
import { BaseHOC } from "@Utils/Functions/HOCs/BaseHOC";
import { ISessionStoreInstance } from "@Models/Session/Session";
import { BaseComponentStyles } from "./BaseComponentStyles";
import { BaseComponent } from "./BaseComponent";

export interface IBaseComponentProps
  extends WithStyles<typeof BaseComponentStyles> {
  [SESSION_STORE]: ISessionStoreInstance;
}

export type IBaseCompType = IBaseComponentType<IBaseComponentProps>;

export const BaseContainer = BaseHOC(
  true,
  false,
  BaseComponentStyles,
  BaseComponent,
  [SESSION_STORE],
);
