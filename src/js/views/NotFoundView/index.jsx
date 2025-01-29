import React from "react";
import { Link } from "react-router";

const NotFoundView = () => {
  return (
    <div className="container text-center">
      <h1>Siden ble ikke funnet - 404</h1>
      <br />
      <p>Du har dessverre havnet på en side som ikke finnes.</p>
    </div>
  );
};

export default NotFoundView;
