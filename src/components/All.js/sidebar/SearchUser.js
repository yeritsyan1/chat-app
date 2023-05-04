import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  or,
  where,
} from "firebase/firestore";
import { app } from "../../../firebase/firestore";
import MessageContext from "../../context/MessageContext";
import { ALLUSER, DISPLAYNAME, EMAIL } from "../message/constant/constant";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  noUserFound: {
    textAlign: "center",
    padding: [10, 0],
    backgroundColor: "black",
    color: "white",
  },
});

export default function SearchUser() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [getUser, setGetUser] = useState(null);
  const selectedUser = useContext(MessageContext);
  const db = getFirestore(app);
  const searchUser = () => {
    if (search.length) {
      (async () => {
        const colRef = collection(db, ALLUSER);
        const snapshots = await getDocs(
          query(
            colRef,
            or(where(EMAIL, "==", search), where(DISPLAYNAME, "==", search))
          )
        );
        const docs = snapshots.docs.map((doc) => {
          setGetUser(true);
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        selectedUser.setFoundUser(docs);
        !docs.length && setGetUser(false);
      })();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchUser();
      }}
    >
      <TextField
        type="search"
        placeholder="Search user"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Button onClick={searchUser}> Search </Button>
      <Button
        onClick={() => {
          selectedUser.setFoundUser([]);
          setGetUser(null);
        }}
      >
        Clear
      </Button>
      {getUser === false && (
        <div className={classes.noUserFound}> No user found. </div>
      )}
    </form>
  );
}
