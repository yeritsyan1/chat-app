import React, { useContext } from "react";
import { createUseStyles } from "react-jss";
import MessageContext from "../../context/MessageContext";

const useStyles = createUseStyles({
  userId: {
    textAlign: "center",
  },
});

export default function HeaderMessage() {
  const classes = useStyles();
  const selectedUser = useContext(MessageContext);
  return <span className={classes.userId}> {selectedUser.user.id} </span>;
}
