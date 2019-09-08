import React from "react";
import logo from "@Assets/Images/logo.svg";
import "./Base.css";
import { SESSION_STORE } from "@Shared/Constants/Models";
import { CustomAxios } from "@Utils/Api";
import { IBaseComponentProps } from "./BaseContainer";

export class BaseComponent extends React.Component<IBaseComponentProps, any> {
  async componentDidMount() {
    let callResponse = await CustomAxios.getTodoById(1);
    console.log("Response from mount:", callResponse);
  }
  render() {
    const { welcomeMessage } = this.props[SESSION_STORE];
    return (
      <div className="Base">
        <header className="Base-header">
          <img src={logo} className="Base-logo" alt="logo" />
          {welcomeMessage}
        </header>
      </div>
    );
  }
}
