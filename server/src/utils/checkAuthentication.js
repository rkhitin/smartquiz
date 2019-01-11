export default (req, res, next) => {
  if (!req.user) {
    res.send(401)

    next()

    return
  }

  next()
}
