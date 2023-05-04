import React, { useState, useContext } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  arrayRemove,
  doc,
  getFirestore,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../../firebase/firestore";
import ShowSnackbar from "../../Snackbar";
import MessageContext from "../../context/MessageContext";
import { MESSAGES } from "./constant/constant";

export default function Delete(props) {
  const { setIsOpen, item } = props;
  const deleteItem = useContext(MessageContext);
  const [err, setErr] = useState(false);
  const onDelete = () => {
    setIsOpen(false);
  };
  const db = getFirestore(app);
  const docRef = doc(db, MESSAGES, deleteItem.user.chatId);
  return (
    <Dialog
      open={true}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}> Delete </DialogTitle>
      <DialogContent>
        Are you sure you want to delete {""}
        <i>
          '{item.letter.slice(0, 25)}
          {item.letter.length > 25 && "..."}' {""}
        </i>
        message?
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            try {
              if (deleteItem.user.messages.length === 1) {
                deleteItem.setUser({});
                deleteDoc(docRef);
              } else {
                updateDoc(docRef, {
                  messages: arrayRemove(item),
                });
                if (
                  item.messageId ===
                  deleteItem.user.messages[deleteItem.user.messages.length - 1]
                    .messageId
                ) {
                  updateDoc(docRef, {
                    lastMessage:
                      deleteItem.user.messages[
                        deleteItem.user.messages.length - 2
                      ].letter,
                  });
                }
              }
              onDelete();
            } catch {
              setErr(true);
              setTimeout(() => {
                setErr(false);
              }, 5000);
            }
          }}
        >
          Yes
        </Button>
        <Button onClick={onDelete}> No </Button>
      </DialogActions>
      {err && (
        <ShowSnackbar message="Something went wrong. Try again." />
      )}
    </Dialog>
  );
}
