import "./App.css";
import Navigation from "./components/ui/Navigation";
import TeacherList from "./components/teacherlist/TeacherList";
import CourseList from "./components/courselist/CourseList";
import LandingPage from "./components/landingpage/LandingPage";
import NoMatch from "./components/nomatch/NoMatch";
import { ReactComponent as HamburgerIcon } from "./assets/icon-1.svg";
import { ReactComponent as LockIcon } from "./assets/icon-2.svg";

import { Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";

import WCContext from "./components/wc_context.js";

function App() {
  const [showMenu, toggleMenu] = useState(false);
  const context = useContext(WCContext);
  console.log('app.js: ',context);

  return (
      <div className="App">
    
          <header className="header">
            <h1>Westcoast Education</h1>
            <div className="menu-button">
              {context.isLoggedIn ? (
                <HamburgerIcon
                  className="icon"
                  onClick={() => toggleMenu((showMenu) => !showMenu)}
                ></HamburgerIcon>
              ) : (
                <button
                  onClick={context.toggleLogin}
                ><LockIcon className="icon" /><br/>
                  Log in 
                </button>
              )}
            </div>
            {showMenu && <Navigation toggleMenu={toggleMenu} />}
          </header>
          <main className="app-main">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </main>
          <footer></footer>
      </div>
  );
}

export default App;
