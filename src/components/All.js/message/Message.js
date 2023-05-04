import React from "react";
import { createUseStyles } from "react-jss";
import HeaderMessage from "./HeaderMessage";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";

const useStyles = createUseStyles({
  parent: {
    boxSizing: "border-box",
    height: "100vh",
    border: [1, "black", "solid"],
    borderRadius: 15,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: [5, 0],
    width: "75%",
    marginLeft: 3,
  },
  childTwo: {
    flexGrow: 2,
    overflow: "scroll",
    border: [1, "black", "solid"],
    borderLeft: "none",
    borderRight: "none",
    borderRadius: 15,
    margin: [2, 0],
  },
});

export default function Message() {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <HeaderMessage />
      <div className={classes.childTwo}>
        <MessageList />
      </div>
      <SendMessage />
    </div>
  );
}
