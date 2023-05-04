import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SIGNIN } from "./All.js/message/constant/constant";
import Loading from "./Loading";

export default function ProtectedRoute(props) {
  const { myId } = props;
  return (
    <div>
      {myId ? (
        <Outlet />
      ) : myId === false ? (
        <Loading />
      ) : (
        <Navigate to={SIGNIN} />
      )}
    </div>
  );
}
