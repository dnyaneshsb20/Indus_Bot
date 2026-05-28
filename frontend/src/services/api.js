import axios from "axios";

const API_URL = "http://127.0.0.1:8000/ask";

export const askQuestion = (question, chatId = null, machineName = null) => {
  return axios.post(API_URL, {
    question: question,
    chat_id: chatId,
    machine_name: machineName
  });
};

export const getChats = () => {
  return axios.get("http://127.0.0.1:8000/chats");
};

export const getMessages = (chatId) => {
  return axios.get(`http://127.0.0.1:8000/messages/${chatId}`);
};
