import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import BoardUser from "./components/BoardUser";

import EventBus from "./common/EventBus";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    AuthService.getCurrentUser().then(setCurrentUser);

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-brand">
          bezKoder
        </div>

        {currentUser && (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <div className="nav-link">
                {currentUser.username}
              </div>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        {currentUser ? <BoardUser /> : <Login />}
      </div>
    </div>
  );
};

export default App;