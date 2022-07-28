import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");

  const getData = () => UserService.getUserBoard().then(
    (response) => {
      setContent(response.data);
    },
    (error) => {
      const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        //console.log(error);
      setContent(_content);

      if (error.status === 403) {
        EventBus.dispatch("logout");
      }
    }
  );

  useEffect(getData, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <button onClick={getData}>resend</button>
    </div>
  );
};

export default BoardUser;
