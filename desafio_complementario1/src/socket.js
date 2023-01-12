import messageModel from "./dao/models/message.model.js";

export default (io) => {
  io.on("connection", (socket) => {
    const getMessages = async () => {
      const messages = await messageModel.find();

      socket.emit("server:messages", messages);
    };
    getMessages();

    // recibo el nuevo mensaje y lo guardo en la base de datos
    socket.on("client:newMessage", async (data) => {
      const newMessage = new messageModel(data);

      const result = await newMessage.save();

      io.emit("server:newMessage", result);
    });
  });
};