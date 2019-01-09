import bcrypt from 'bcrypt'

import { User } from '../db/models'
import { usersRoles } from '../db/contants'

// Обновление данных. Обновляем только те данные которые пришли.
// Обновлять может админ кого угодно и юзер себя
export default async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401)

    const { id, login, password, role } = req.body

    const updatingUser = User.findOne({ id })

    if (!updatingUser) return res.status(400).send('Пользователь не найден')

    // Если текущий юзер не админ и пытается обновить не себя - посылаем его
    if (req.user.role !== usersRoles.admin && req.user.id !== updatingUser.id) return res.sendStatus(403)

    if (login) {
      updatingUser.login = login
    }

    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10)

      updatingUser.password = encryptedPassword
    }

    if (role && Object.keys(usersRoles).includes(role)) {
      updatingUser.role = role
    }

    await updatingUser.save()

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
