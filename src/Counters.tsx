import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import store from "./redux/index";
import slice from "./redux/counter/slice";

const Counters = () => {
    const countersState = useSelector((state: RootStateOrAny) => state?.counterState);
    const { dispatch } = store;

    return (
        <>
            <p>The counter value is {countersState.counters}</p>
            <button onClick={() => dispatch(slice.actions.setCount(countersState.counters + 1))}>+ Add</button>
            <button onClick={() => dispatch(slice.actions.setCount(countersState.counters - 1))}>- remove</button>
        </>
    )
}

export default Counters
