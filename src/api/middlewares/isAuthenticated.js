import jwt from "jsonwebtoken";

const isAuthenticated = (fn) => async (req, res) => {
  const token = req.cookies?.auth;

  if (!token) return res.status(401).end();
  // if (!token) return res.redirect(401).end();

  await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (error, user) => {
      if (error) return res.status(403).end();

      req.user = { _id: user.sub };
      return await fn(req, res);
    }
  );
};

export default isAuthenticated;
