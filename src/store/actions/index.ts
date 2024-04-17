import { ActionInterface, ActionType } from "../types";

export function setTest(test: string): ActionInterface {
  return {
    type: ActionType.SET_TEST,
    payload: test,
  };
}
