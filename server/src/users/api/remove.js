import { User, usersRoles } from '@users'

// Удаление юзера. Можно удалять себя или кого угодно если админ
export default async (req, res) => {
  try {
    const { id } = req.body

    // Если текущий юзер не админ и пытается удалить не себя - посылаем его
    if (req.user.role !== usersRoles.admin && req.user.id !== id) return res.sendStatus(403)

    await User.deleteOne({ _id: id })

    // Если юзер удаляет себя, логаутим его
    if (req.user.id === id) {
      req.logout()
    }

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
