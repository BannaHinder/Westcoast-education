import { render, screen } from "@testing-library/react";
import TeacherList from "./TeacherList";
import { BrowserRouter } from "react-router-dom";

describe("List of teachers ", () => {
  const setup = () => render(<TeacherList />);
  test("renders subtitle Teacherlist", () => {
    setup();
    const titleElement = screen.getByText(/Teachers/);
    expect(titleElement).toBeInTheDocument();
  });
  test("API fetch works and populate teacher list", () => {
    setup();

    const server = setupServer(
      rest.get("http://localhost:3010/teachers", (req, res, context) => {
        return res(
          context.json([
            {
              id: 2,
              fullName: "Name Namesson",
              SNS: 128731233,
              email: "name.namesson@wc.edu.com",
              mobileNumber: "0701111111",
              qualifications: ["Tying shoelaces", "brushing teeth"],
            },
          ])
        );
      })
    );
    server.listen();
    const listElements = screen.queryAllByRole("listitem");
    expect(listElements).not.toHaveLength(0);
  });
});
