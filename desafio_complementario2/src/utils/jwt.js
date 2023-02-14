import jwt from "jsonwebtoken";
import passport from "passport";

//JWT_SECRET="amongus333"
//COOKIE_NAME="hans2015"

export const generateToken = (user) => {
  const token = jwt.sign({ user }, 'amongus333', {
    expiresIn: "24h",
  });

  return token;
};

export const authToken = (req, res, next) => {
  const cookieName = 'hans2015';

  const authCookie = req.cookies[cookieName];

  if (!authCookie) {
    return res.status(401).send({
      error: "Not Auth",
    });
  }

  jwt.verify(authCookie, 'amongus333', (error, credentials) => {
    if (error) {
      return res.status(403).send({
        error: "Not Authorized",
      });
    }

    req.user = credentials.user;

    next();
  });
};

export const cookieExtractor = (req) => {
  const token =
    req && req.cookies ? req.cookies['hans2015'] : null;

  return token;
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next();
      if (!user) return res.status(400).render("error", { error: info });

      req.user = user;

      next();
    })(req, res, next);
  };
};