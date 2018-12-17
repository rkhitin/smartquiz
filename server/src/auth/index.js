import bcrypt from 'bcrypt'

import { User } from '../db/models'

export const register = async (req, res) => {
  try {
    const { login, password } = req.body

    if (!login || !password) return res.status(400).send('Нет логина или пароля')

    const encryptedPassword = await bcrypt.hash(password, 10)

    const userData = {
      login,
      password: encryptedPassword,
    }

    const newUser = new User(userData)

    await newUser.save()

    res.sendStatus(200)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

export const authorize = async (req, res) => {
  const u = await User.findOne({}).exec()

  const r = await u.verifyPassword('123')

  console.log(r)

  res.send('asdf')
}
