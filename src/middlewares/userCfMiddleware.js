module.exports = (req, res, next) => {
  if (req.session.userLogged && req.session.userLogged.cf !== null) {
    return res.redirect("/cf");
  }
  return next();
};
