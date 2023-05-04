import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createUseStyles } from "react-jss";
import SendIcon from "@mui/icons-material/Send";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../../firebase/firestore";
import MessageContext from "../../context/MessageContext";
import { combineId, MESSAGES } from "./constant/constant";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

const useStyles = createUseStyles({
  parent: {
    margin: [0, "auto"],
  },
});

export default function SendMessage() {
  const classes = useStyles();
  const db = getFirestore(app);
  const selectedUser = useContext(MessageContext);
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const sendMessage = async () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const createId = combineId(selectedUser.myId, selectedUser.user.id);
    const docRef = await doc(db, MESSAGES, createId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        chatId: createId,
        user: [selectedUser.myId, selectedUser.user.id],
        lastMessage: text,
        messages: [
          {
            letter: text,
            owner: selectedUser.myId,
            messageId: uuid(),
            time: `${hours < 10 ? "0" + hours : hours} : ${
              minutes < 10 ? "0" + minutes : minutes
            }`,
            date: `${day} / ${month} / ${year}`,
          },
        ],
      });
    } else {
      await updateDoc(doc(db, MESSAGES, createId), {
        lastMessage: text,
        messages: arrayUnion({
          letter: text,
          owner: selectedUser.myId,
          messageId: uuid(),
          time: `${hours < 10 ? "0" + hours : hours} : ${
            minutes < 10 ? "0" + minutes : minutes
          }`,
          date: `${day} / ${month} / ${year}`,
        }),
      });
    }

    await inputRef.current.focus();
    await setText("");
  };

  return (
    <form
      className={classes.parent}
      onSubmit={(e) => {
        e.preventDefault();
        text.length && sendMessage();
      }}
    >
      <TextField
        placeholder="Write something..."
        inputRef={inputRef}
        autoFocus
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button onClick={sendMessage} disabled={!text.length} variant="contained">
        Send
        <SendIcon />
      </Button>
    </form>
  );
}
