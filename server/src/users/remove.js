import { User } from '../db/models'
import { usersRoles } from '../db/contants'

// Удаление юзера. Можно удалять себя или кого угодно если админ
export default async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401)

    const { id } = req.body

    const removingUser = User.findOne({ id })

    if (!removingUser) return res.status(400).send('Пользователь не найден')

    // Если текущий юзер не админ и пытается удалить не себя - посылаем его
    if (req.user.role !== usersRoles.admin && req.user.id !== removingUser.id) return res.sendStatus(403)

    await removingUser.remove()

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
