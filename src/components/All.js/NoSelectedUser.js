import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  parent: {
    width: "75%",
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    fontWeight: 700,
    fontSize: 26,
    color: "white",
  },
});

export default function NoSelectedUser() {
  const classes = useStyles();
  return (
    <div className={classes.parent}>
      <p> No Selected User</p>
    </div>
  );
}
