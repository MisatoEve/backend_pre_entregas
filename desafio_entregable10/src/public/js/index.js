const socket = io();
const user = document.getElementById("user__name").innerHTML;
const chatbox = document.getElementById("user__input");
const messagesContainer = document.getElementById("messages__container");

socket.emit("auth", user);

//▼Se capta el evento cuando el usuario hace enter
chatbox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      saveMessage(user, chatbox.value);
      chatbox.value = "";
    }
  }
});

//▼Leer los mensajes de la base de datos
const loadMessages = (callback) => {
  socket.on("server:messages", callback);
};

//▼Se envía al servidor el nuevo mensaje
const saveMessage = (user, message) => {
  socket.emit("client:newMessage", {
    user,
    message,
  });
};

const loadNewMessage = (callback) => {
  socket.on("server:newMessage", callback);
};

//▼Se toma un mensaje y se lo pinta en el DOM
const oneMessage = (message) => {
  const container = document.createElement("div");

  container.innerHTML = `
    <h3>${message.user}:</h3>
    <p>${message.message}</p>
  `;

  return container;
};

//▼Se recibe el array de mensajes y los itera para pintarlos en el DOM
const renderMessages = (messages) => {
  messagesContainer.innerHTML = "";
  messages.forEach((message) => messagesContainer.append(oneMessage(message)));
};

//▼Se pinta el nuevo mensaje al DOM
const appendNewMessage = (message) => {
  messagesContainer.append(oneMessage(message));
};

//▼Cargar los mensajes cuando se carga la página
window.addEventListener("DOMContentLoaded", () => {
  loadMessages(renderMessages);
  loadNewMessage(appendNewMessage);
});