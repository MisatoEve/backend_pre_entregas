export const getChatPage = async (req, res) => {
    try {
      res.render("chat", {
        style: "style.css",
      });
    } catch (error) {
      console.log(error);
  
      res.send({
        succes: false,
        error,
      });
    }
  };