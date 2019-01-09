// Данные о текущем юзере
export default async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401)

    res.json(req.user)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
