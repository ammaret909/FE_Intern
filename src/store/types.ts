/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TestState {
  test: string;
}

export enum ActionType {
  SET_TEST = "SET_TEST",
}

export interface SetAction {
  type: ActionType;
  payload: any;
}

export type Action = SetAction;

export type ActionInterface = Action;
export type DispatchType = (args: Action) => Action;
