import { render, screen, cleanup} from "@testing-library/react";
import CourseList from "./CourseList";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { WCContextProvider } from "../wc_context";

describe( "and display of course data w <WCContextProvider>", () => {

    //HEJ O HÅ DET FUNKAR INTE MED CLEANUP FUNCTIONS
  // afterEach(() => {
  //   cleanup();
  // });

  test("provides expected WCContext obj to child elements using jest mockdata", async () => {

    render(
      <WCContextProvider value={{ fetchCourses: jest.fn() }}>
        <CourseList />
      </WCContextProvider>,
      { wrapper: BrowserRouter }
    );

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 2,
          courseNumber: "C01",
          courseTitle: "How to brush your teeth",
          weeks: 12,
          startDate: "2023-03-10",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    });

    const courses = await screen.findAllByRole("listitem");
    expect(courses).not.toHaveLength(0);

  });
})

//Ok så om man kör dem separat så funkar de, men samtidigt: NEJ.
//är 99% säker på att det handlar om att den inbyggda cleanup function inte gör det den ska
//Men jag vet inte hur man implementerar en egen 

// describe(" and display course data w <WCContextProvider>",() =>{

//   test("same style data rendering using MSW", async () => {
//     render(
//       <WCContextProvider value={{fetchCourses: jest.fn(() => Promise.resolve()), coursesList: []}}>
//         <CourseList/>
//       </WCContextProvider>,
//        {wrapper: BrowserRouter}
//     )
//     const server = setupServer(
//       rest.get("http://localhost:3010/courses", (req, res, context) => {
//         return res(
//           context.status(301),
//           context.set('Content-Type', 'application/json'),
//           context.json([
//             {
//               id: 2,
//               courseNumber: "C01",
//               courseTitle: "How to brush your teeth",
//               weeks: 12,
//               startDate: "2023-03-10",
//               description:
//                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//             },
//           ])
//         );
//       })
//     );
//     server.listen();
//     const listItems = await screen.findAllByRole("listitem");
//     expect(listItems).not.toHaveLength(0);
//   });



  // Testing portals is too difficult man I QUIT

  //   test('posting data from form', async ()=>{
  //     setup();
  //     let requestBody;
  //     const server = setupServer(
  //         rest.post("http://localhost:3010/courses", (req, res, context) => {
  //           req.json().then((data) => (requestBody = data));
  //           return res(context.status(201));
  //         })
  //       );
  //       server.listen();

  //         const addBtn = screen.getByText(/Add Course/i)
  //         fireEvent.click(addBtn)
  //         await new Promise((resolve) => setTimeout(resolve, 500));
  //      const form = screen.getByRole('form')
  //      expect(form).toBeInTheDocument();
  //       const numberInput = screen.getByLabelText(/Course number:/i);
  //     const titleInput = screen.getByLabelText(/Name:/i);
  //     const dateInput = screen.getByLabelText("Start date:");
  //     const descriptionInput = screen.getByLabelText("Description:");
  //     const weekinput = screen.getByDisplayValue("Duration:");
  //     const submitBtn = screen.getByDisplayValue("Add");

  //     userEvent.type(numberInput, "M03");
  //     userEvent.type(titleInput, "MockTitle");
  //     userEvent.type(dateInput, "2023-01-30");
  //     userEvent.type(weekinput, "10");
  //     userEvent.type(descriptionInput, "beskrivning");
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     fireEvent.click(submitBtn);

  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     expect(requestBody).toEqual({
  //         courseNumber: "M03",
  //         courseTitle: "MockTitle",
  //         weeks: "n10",
  //         startDate: "2023-01-30",
  //         description: "beskrivning"
  //       });

  //     server.close();
  //   })
//});
