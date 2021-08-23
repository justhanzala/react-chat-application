import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import store from "../redux/index";
import slice from "../redux/counter/slice";

const Counters = () => {
  const countersState = useSelector(
    (state: RootStateOrAny) => state.countersState
  );
  const { dispatch } = store;

  return (
    <div data-testid="counters">
      <p>The counter value is {countersState.counters}</p>
      <button
        onClick={() =>
          dispatch(slice.actions.setCount(countersState.counters + 1))
        }
      >
        + Add
      </button>
      <button
        onClick={() =>
          dispatch(slice.actions.setCount(countersState.counters - 1))
        }
      >
        - remove
      </button>
    </div>
  );
};

export default Counters;
