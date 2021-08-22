import Counters from "../Counters";
import {render, screen} from '@testing-library/react'
import React from "react";
import { Provider } from "react-redux";
import store from "../../redux";

test("renders without crashing", () => {
  const { getByTestId } = render(<Provider store={store}>
    <Counters />
  </Provider>);
  expect(getByTestId("counters")).toBeTruthy()
});
