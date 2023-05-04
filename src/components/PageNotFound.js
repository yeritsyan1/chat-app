import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const useStyles = createUseStyles({
  div: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  icon: {
    fontSize: 66,
  },
  link: {
    textAlign: "center",
    color: "white",
  },
});

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <WarningAmberIcon className={classes.icon} />
      <h1> Page Not Found. </h1>
      <Link to="/" className={classes.link}>
        Home page
      </Link>
    </div>
  );
}
