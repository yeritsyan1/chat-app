import React, { useEffect, useContext, useRef } from "react";
import MessageContext from "../../context/MessageContext";
import ReadMessage from "./ReadMessage";
import { v4 as uuid } from "uuid";

export default function MessageList() {
  const selectedUser = useContext(MessageContext);
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [selectedUser.user.messages]);

  return (
    <div>
      {selectedUser.user.messages?.map((message) => {
        return (
          <div key={uuid()} ref={messageRef}>
            <ReadMessage message={message} />
          </div>
        );
      })}
    </div>
  );
}
