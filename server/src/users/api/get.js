import { User, usersRoles } from '@users'

// Список всех юзеров, только для админа
export default async (req, res) => {
  try {
    const { id } = req.body

    // Если текущий юзер не админ и пытается получить не себя - посылаем его
    if (req.user.role !== usersRoles.admin && req.user._id.toString() !== id) return res.sendStatus(403)

    const findingUser = await User.findOne({ _id: id })

    res.json(findingUser)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
