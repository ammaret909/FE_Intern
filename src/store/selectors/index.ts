import { TestState } from "./types";

export function getTest(state: TestState) {
  return state.TestReducer.test;
}
