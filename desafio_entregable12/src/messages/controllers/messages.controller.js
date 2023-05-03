export const getChatPage = async (req, res) => {
    try {
      const user = req.session.user;

      res.render("chat", {
        style: "style.css",
        user,
      });
    } catch (error) {
      console.log(error);
  
      res.send({
        succes: false,
        error,
      });
    }
  };