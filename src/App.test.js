import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("banners/headingas contain titlename 'Westcoast education'", () => {
  render(<App />, { wrapper: BrowserRouter });
  const headers = screen.queryAllByRole('banner')
  headers.forEach((header)=>{
    expect(header.innerHTML).toContain("Westcoast Education");
  })
 
});
 
describe("Test routing of app", () => {
  const setup = () => render(<App />, { wrapper: BrowserRouter });
  beforeEach(() => {
    window.localStorage.clear();
  });
  setup();

  const logInBtn = screen.queryByText(/Log In/i);
  if (logInBtn !== null) {
    fireEvent.click(logInBtn);
  }

  test.each`
    path           | componentTestId
    ${"/"}         | ${"landing-page-component"}
    ${"/teachers"} | ${"teacher-list-component"}
    ${"/courses"}  | ${"course-list-component"}
  `(
    "display $componentTestId when path is $path",
    ({ path, componentTestId }) => {
      // Arrange
      window.history.pushState({}, "", path);
      setup();
      const elem = screen.queryByTestId(componentTestId);

      // Assert
      expect(elem).toBeInTheDocument();
    }
  );
});
