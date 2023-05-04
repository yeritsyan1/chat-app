import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  box: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Loading() {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <CircularProgress />
    </Box>
  );
}
