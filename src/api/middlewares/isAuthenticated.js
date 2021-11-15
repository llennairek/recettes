import jwt from "jsonwebtoken";

import User from "../models/User";

const isAuthenticated = (fn) => async (req, res) => {
  try {
    const isAuthorized = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET
    );
    if (isAuthorized) {
      console.log(isAuthorized);
      const user = await User.findById(isAuthorized.sub).populate(
        "recipesOwner"
      );
      console.log(user);
      req.user = user;
      return await fn(req, res);
    }
  } catch (error) {
    res.status(401).json({ message: "Not Authenticated", error });
  }
};

export default isAuthenticated;
