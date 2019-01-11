import bcrypt from 'bcrypt'

import { User, usersRoles } from '@users'

// Обновление данных. Обновляем только те данные которые пришли.
// Обновлять может админ кого угодно и юзер себя
export default async (req, res) => {
  try {
    const { id, login, password, role } = req.body

    const updatingUser = await User.findOne({ _id: id })

    if (!updatingUser) return res.status(400).send('Пользователь не найден')

    // Если текущий юзер не админ и пытается обновить не себя - посылаем его
    if (req.user.role !== usersRoles.admin && req.user._id !== updatingUser._id) return res.sendStatus(403)

    if (login) {
      updatingUser.login = login
    }

    if (password) {
      updatingUser.encryptedPassword = await bcrypt.hash(password, 10)
    }

    if (role && Object.keys(usersRoles).includes(role)) {
      updatingUser.role = role
    }

    await updatingUser.save()

    res.json(updatingUser)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
