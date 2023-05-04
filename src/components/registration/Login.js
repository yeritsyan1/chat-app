import React, { useState } from "react";
import { Button } from "@mui/material";
import { app } from "../../firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { ALLUSER } from "../All.js/message/constant/constant";
import ShowSnackbar from "../Snackbar";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  parent: {
    height: "100vh",
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 20,
    gap: 10,
  },
});

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [err, setErr] = useState();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const docRef = await doc(db, ALLUSER, result.user.email);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            displayName: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
            id: result.user.uid,
          });
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setErr(true);
      });
  };

  return (
    <div className={classes.parent}>
      <span> Sign In With Google </span>
      <Button onClick={signIn} variant="contained">
        Sign In
      </Button>
      {err && <ShowSnackbar message="Something went wrong." />}
    </div>
  );
}
