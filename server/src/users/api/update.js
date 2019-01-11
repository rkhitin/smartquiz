import { User, usersRoles } from '@users'

// Обновление данных. Обновляем только те данные которые пришли.
// Обновлять может админ кого угодно и юзер себя
export default async (req, res) => {
  try {
    const { id } = req.body

    // Если текущий юзер не админ и пытается обновить не себя - посылаем его
    if (req.user.role !== usersRoles.admin && req.user._id !== id) return res.sendStatus(403)

    const [err, updatingUser] = await User.updateUser(req.body)

    console.log(updatingUser)

    if (err) return res.status(400).send(err.message)

    res.json(updatingUser)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
