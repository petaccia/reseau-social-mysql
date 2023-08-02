import React, { createContext } from "react";

const MessageContext = createContext({
  messages: [],
  addMessage: () => {},
  deleteMessage: () => {},
  sendMessage: () => {},
});

export default MessageContext;
