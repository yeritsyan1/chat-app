import { getAuth } from "firebase/auth";
import React, { useState, useContext } from "react";
import { createUseStyles } from "react-jss";
import { app } from "../../../firebase/firestore";
import Button from "@mui/material/Button";
import Delete from "./Delete";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageContext from "../../context/MessageContext";

const useStyles = createUseStyles({
  parentDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: (owner) => {
      return owner.owner === owner.user ? "end" : "start";
    },
  },
  date: {
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
    marginBo: 0,
    backgroundColor: "#737777",
    color: "white",
    display: (isShow) => {
      return isShow.isShow ? "block" : "none";
    },
  },
  time: {
    alignSelf: "center",
  },
  message: {
    minWidth: 200,
    maxWidth: "50%",
    padding: [10, 20],
    margin: [5, 0],
    border: [1, "black", "solid"],
    borderRadius: 15,
    borderTopLeftRadius: (owner) => {
      return owner.owner === owner.user ? 15 : 0;
    },
    borderTopRightRadius: (owner) => {
      return owner.owner === owner.user ? 0 : 15;
    },
    backgroundColor: (owner) => {
      return owner.owner === owner.user ? "green" : "blue";
    },
    color: "white",
    wordBreak: "break-all",
  },
});

export default function ReadMessage(props) {
  const { message } = props;
  const { owner, time, date, letter } = message;
  const auth = getAuth(app);
  const readData = useContext(MessageContext);
  const user = auth.currentUser.email;
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles({ owner, user, isShow });

  const onDelete = () => {
    setIsOpen(true);
  };
  return (
    <div className={classes.parentDiv}>
      <p className={classes.date}> {date} </p>
      <p className={classes.time}> {time} </p>
      <p
        className={classes.message}
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        {letter}
      </p>
      {readData.myId === owner && isShow && (
        <Button onClick={onDelete}>
          <DeleteIcon />
        </Button>
      )}
      {isOpen && <Delete setIsOpen={setIsOpen} item={message} />}
    </div>
  );
}
