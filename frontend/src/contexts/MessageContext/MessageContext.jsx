import React, { createContext } from "react";

const MessageContext = createContext({
  messages: [],
  addMessage: () => {},
  deleteMessage: () => {},
  sendMessage: () => {},
  deleteAllMessages: () => {},
  updateMessage: () => {},
  getMessages: () => {},
  updateViewStatus: () => {},
});

export default MessageContext;
