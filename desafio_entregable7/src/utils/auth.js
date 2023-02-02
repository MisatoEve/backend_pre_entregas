const auth = (req, res, next) => {
    if (req.session?.user) return next();
  
    return res.status(401).send({
      status: "error",
      error: "No tiene permisos de acceso",
    });
  };
  
  export default auth;