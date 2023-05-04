import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../../firebase/firestore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../message/constant/constant";
import { useContext } from "react";
import MessageContext from "../../context/MessageContext";
import ShowSnackbar from "../../Snackbar";

export default function SidebarHeader() {
  const auth = getAuth(app);
  const resetContext = useContext(MessageContext);
  const [myName, setMyName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const resetData = () => {
    resetContext.setUser({});
    resetContext.setFoundUser([]);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setMyEmail(user.email);
        setMyName(user.displayName);
      }
    });
  }, [auth]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        resetData();
      })
      .then(() => {
        navigate(SIGNIN);
      })
      .catch(() => {
        setErr(true);
      });
  };

  return (
    <div>
      <Button
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        My Account
      </Button>
      {isShow && (
        <div>
          <p style={{ textAlign: "start" }}> Full Name: {myName} </p>
          <p style={{ textAlign: "start" }}> Email: {myEmail} </p>
          <Button onClick={logOut} variant="contained" color="error">
            Log out
          </Button>
        </div>
      )}
      {err && <ShowSnackbar message="Fail" />}
    </div>
  );
}
