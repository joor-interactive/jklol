import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { container } = render(<App />);
  const linkElement = container.querySelector(".App");
  expect(linkElement).toBeInTheDocument();
});
