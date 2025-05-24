"use client";
import React from "react";
import { store } from "../store/index";
import { Provider } from "react-redux";

const ReduxProvider = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default ReduxProvider;
