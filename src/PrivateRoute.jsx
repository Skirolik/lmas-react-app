import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ path, element, loggedIn }) {
  if (loggedIn) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
