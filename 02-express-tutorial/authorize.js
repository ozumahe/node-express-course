const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "ebenezer") {
    req.user = { name: "ebenezer", id: 23 };
    next();
  } else {
    res.status(401).send("<h1>Unauthorized</h1>");
  }
};

module.exports = authorize;
