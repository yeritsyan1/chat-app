import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import MessageContext from "../context/MessageContext";
import Message from "./message/Message";
import NoSelectedUser from "./NoSelectedUser";
import Sidebar from "./sidebar/Sidebar";

const useStyles = createUseStyles({
  parent: {
    display: "flex",
  },
});

export default function All() {
  const classes = useStyles();
  const selectedUser = useContext(MessageContext);
  return (
    <div className={classes.parent}>
      <Sidebar />
      {selectedUser.user.id ? <Message /> : <NoSelectedUser />}
    </div>
  );
}
