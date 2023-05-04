import React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function ShowSnackbar(props) {
  const { message } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={true}
      message={message}
    />
  );
}
