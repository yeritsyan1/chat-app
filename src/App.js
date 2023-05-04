import { useState, useEffect } from "react";
import All from "./components/All.js/All";
import Login from "./components/registration/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessageContext from "./components/context/MessageContext";
import { SIGNIN } from "./components/All.js/message/constant/constant";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebase/firestore";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const [foundUser, setFoundUser] = useState([]);
  const [myId, setMyId] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setMyId(user.email);
      }
    });
  }, [auth.currentUser]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute myId={myId} />}>
            <Route
              path="/"
              element={
                <MessageContext.Provider
                  value={{
                    myId: myId,
                    user: user,
                    setUser: setUser,
                    foundUser: foundUser,
                    setFoundUser: setFoundUser,
                  }}
                >
                  <All />
                </MessageContext.Provider>
              }
            >
              All
            </Route>
          </Route>
          <Route path={SIGNIN} exact element={<Login />}>
            Log in
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
