import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HomePage } from "./pages/Home";
import { Event } from "./interfaces/events";

describe("Testing basic application functionality", () => {
  const mockResponse: Event[] = [
    {
      id: 1,
      title: "Magnam animi voluptatibus nihil fugit.",
      startTime: new Date("2022-07-13T18:00:00.000Z"),
      endTime: new Date("2022-07-13T18:33:00.000Z"),
      address: "2223 Shania Throughway",
      status: "done",
    },
  ];
  const jfn = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockResponse) })
  ) as jest.Mock;
  jest.spyOn(global, "fetch").mockImplementation(jfn);
  const App = () => (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
  it("renders the application properly", () => {
    render(<App />);
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });
  it("checking is data fetching taking place", () => {
    render(<App />);
    expect(jfn.mock.calls.length == 1);
  });
  it("checking if calendar view default", () => {
    render(<App />);
    expect(screen.getByText("Wed")).toBeInTheDocument();
  });
});
