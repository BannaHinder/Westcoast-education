import CourseList from "../courselist/CourseList";
import WCContext from "../wc_context.js";
import { useContext } from "react";

function LandingPage() {
  const context = useContext(WCContext);

  return (
    <>
      {context.isLoggedIn ? (
        <section data-testid="landing-page-component">
          <h2>Welcome to Westcoast education Admin</h2>
          <p>
            Navigate over to teachers to administer teachers, or over to courses
            to manage content of courses
          </p>
        </section>
      ) : (
        <>
          <section data-testid="landing-page-component">
            <h2>Welcome to Westcoast education platform</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
              Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
              venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum
              eget. Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos.
            </p>
          </section>
          <CourseList />
        </>
      )}
    </>
  );
}

export default LandingPage;
