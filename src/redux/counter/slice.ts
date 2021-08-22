import { createSlice } from "@reduxjs/toolkit";

const counters = createSlice({
    name: "counters",
    initialState: {
        counters: 0
    },
    reducers: {
        setCount: (state, action) => {
            state.counters = action.payload
        }
    }
})

export default counters;