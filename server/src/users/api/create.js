import { User, usersRoles } from '@users'

// Создание юзера, получаем логин, пароль и роль.
// Проверяем уникальность логина и корректность роли, если все ок - создаем
export default async (req, res) => {
  try {
    if (req.user.role !== usersRoles.admin) return res.sendStatus(403)

    const [err, user] = await User.encryptPasswordAndCreateUser(req.body)

    if (err) {
      return res.status(400).send(err.message)
    }

    res.json(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
