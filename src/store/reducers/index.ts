import { TestState, ActionType, ActionInterface } from "../types";

const initialTestState: TestState = {
  test: "init",
};

export function TestReducer(
  state = initialTestState,
  action: ActionInterface
): TestState {
  switch (action.type) {
    case ActionType.SET_TEST:
      return { ...state, test: action.payload };
    default:
      return state;
  }
}
