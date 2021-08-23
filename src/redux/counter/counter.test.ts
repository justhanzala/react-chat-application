import slice from "./slice";
const { reducer, actions } = slice;

test("should return the initial state", () => {
  expect(reducer(undefined, { type: "init" })).toEqual({
    counters: 0,
  });
});

test("should handle the action set count", () => {
  const previousState = {
    counters: 0,
  };
  expect(reducer(previousState, actions.setCount(1))).toEqual({
    counters: 1,
  });
});
