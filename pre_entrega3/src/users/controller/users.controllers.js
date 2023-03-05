import dotenv from "dotenv";
dotenv.config();

export const getRegister = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
};

export const getLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).render("errors", { error: err });

    res.clearCookie(process.env.COOKIE_NAME).redirect("/login");
  });
};

export const postRegister = (req, res) => {
  res.status(200).redirect("/login");
};

export const postLogin = (req, res) => {
  if (!req.user) {
    return res.status(400).render("error", { error: "Invalid credentials" });
  }

  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
  };

  res.cookie(process.env.COOKIE_NAME, req.user.token).redirect("/products");
};

export const getCurrentUser = (req, res) => {
  try {
    const user = req.session.user;

    res.status(200).render("session", { styles: "style.css", user });
  } catch (error) {
    console.log(error);
  }
};