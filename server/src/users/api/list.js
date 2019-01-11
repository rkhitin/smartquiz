import { User, usersRoles } from '@users'

// Список всех юзеров, только для админа
export default async (req, res) => {
  try {
    if (req.user.role !== usersRoles.admin) return res.sendStatus(403)

    const users = await User.find({})

    res.json(users)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
