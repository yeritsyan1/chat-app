import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";

import { v4 as uuid } from "uuid";
import { createUseStyles } from "react-jss";
import SidebarHeader from "./SidebarHeader";
import SearchUser from "./SearchUser";
import MessageContext from "../../context/MessageContext";
import {
  CHATID,
  combineId,
  MESSAGES,
  USER,
} from "../message/constant/constant";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebase/firestore";
import { getAuth } from "firebase/auth";

const useStyles = createUseStyles({
  box: {
    width: "25%",
    height: "100vh",
    overflow: "scroll",
    boxSizing: "border-box",
    border: [1, "black", "solid"],
    borderRadius: 15,
    overflowX: "hidden",
    display: (props) => {
      return props.display;
    },
  },
  boxList: {
    margin: [2, 0],
  },
  countUser: {
    textAlign: "center",
    backgroundColor: "#999",
    color: "white",
    margin: 0,
    paddingTop: 3,
  },
  selctedListItem: {
    backgroundColor: "green",
    color: "white",
  },
  lastMessage: {
    color: "black",
    fontWeight: 600,
    letterSpacing: 0.5,
    fontSize: 14,
  },
});

export default function Sidebar() {
  const classes = useStyles({ display: true ? "block" : "none" });
  const db = getFirestore(app);
  const auth = getAuth(app);
  const selectedUser = useContext(MessageContext);
  const [myMessages, setMyMessages] = useState([]);

  const getMyMessages = async () => {
    if (auth?.currentUser) {
      const q = query(
        collection(db, MESSAGES),
        where(USER, "array-contains", selectedUser.myId)
      );
      onSnapshot(q, (querySnapshot) => {
        const dataArr = [];
        querySnapshot.forEach((doc) => {
          return dataArr.push(doc.data());
        });
        return setMyMessages(dataArr);
      });
    }
  };

  const getMessagesWithSearchUser = async (user) => {
    const createId = combineId(selectedUser.myId, user.email);
    const q = query(collection(db, MESSAGES), where(CHATID, "==", createId));
    const dataArr = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return dataArr.push(doc.data());
    });
    dataArr.length === 0
      ? dataArr.push({ id: user.email })
      : (dataArr[0]["id"] = user.email);
    await selectedUser.setUser(dataArr[0]);
  };

  useEffect(() => {
    getMyMessages();
  }, []);

  useEffect(() => {
    const messageWith = myMessages.find((name) => {
      return selectedUser.user.id == name.id;
    });
    messageWith && selectedUser.setUser(messageWith);
  }, [myMessages]);

  return (
    <div className={classes.box}>
      <SidebarHeader />
      <SearchUser />
      {/* search user */}
      {!selectedUser.foundUser.length || (
        <Box className={classes.boxList}>
          <p className={classes.countUser}>
            Found {selectedUser.foundUser.length} user
          </p>
          {selectedUser.foundUser.map((user) => {
            return (
              <List
                key={user.id}
                disablePadding
                className={
                  selectedUser.user.id === user.email
                    ? classes.selctedListItem
                    : null
                }
              >
                <ListItemButton
                  onClick={() => {
                    getMessagesWithSearchUser(user);
                  }}
                >
                  <ListItemText>{user.id}</ListItemText>
                </ListItemButton>
              </List>
            );
          })}
        </Box>
      )}
      {/* my messages  */}
      <p className={classes.countUser}> My messages </p>
      {myMessages.map((user) => {
        const messageWith =
          user.user.find((name) => {
            return selectedUser.myId !== name;
          }) || selectedUser.myId;

        user["id"] = messageWith;
        user["myId"] = selectedUser.myId;
        return (
          <ListItem
            key={uuid()}
            disablePadding
            value={selectedUser.user}
            onChange={(e) => {
              selectedUser.setUser(e.target.value);
            }}
            className={
              selectedUser.user === user ? classes.selctedListItem : null
            }
          >
            <ListItemButton
              onClick={() => {
                selectedUser.setUser(user);
              }}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <div>
                <ListItemText primary={messageWith} />
                <span className={classes.lastMessage}>
                  {user.lastMessage?.slice(0, 25)}
                  {user.lastMessage?.length > 25 && "..."}
                </span>
              </div>
            </ListItemButton>
          </ListItem>
        );
      })}
      <Divider />
    </div>
  );
}
