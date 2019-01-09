import bcrypt from 'bcrypt'

import { User } from '../db/models'
import { usersRoles } from '../db/contants'

// Создание юзера, получаем логин, пароль и роль.
// Проверяем уникальность логина и корректность роли, если все ок - создаем
export default async (req, res) => {
  try {
    if (!req.user) return res.sendStatus(401)

    if (req.user.role !== usersRoles.admin) return res.sendStatus(403)

    const { login, password, role } = req.body

    const isLoginExist = await User.checkLoginExistence(login)

    if (isLoginExist) {
      return res.status(400).send('Пользователь с таким логином уже существует')
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const userData = {
      login,
      role,
      password: encryptedPassword,
    }

    const newUser = new User(userData)

    await newUser.save()

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
