import bcrypt from 'bcrypt'

import { logger } from '@utils'
import { usersRoles } from './constants'

/**
 * @this instance of User
 * @retun boolean
 */
export async function verifyPassword(password) {
  try {
    const res = await bcrypt.compare(password, this.encryptedPassword)

    return res
  } catch (err) {
    logger.error(err.message)

    return false
  }
}

/**
 * @this User
 * @retun [error, user]
 */
export async function encryptPasswordAndCreateUser({ login, password, role }) {
  if (!Object.keys(usersRoles).includes(role)) return [{ message: 'Неправильная роль' }, null]

  try {
    const existUser = await this.findOne({ login })

    if (existUser) return [{ message: 'Пользователь с таким логином уже существует' }, null]

    if (password.length < 5) return [{ message: 'Слишком короткий пароль' }, null]

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await this.create({
      login,
      role,
      encryptedPassword,
    })

    return [null, user]
  } catch (err) {
    logger.error(err.message)

    return [err, null]
  }
}

/**
 * @this User
 * @retun [error, user]
 */
export async function updateUser({ id, login, password, role }) {
  if (role && !Object.keys(usersRoles).includes(role)) return [{ message: 'Неправильная роль' }, null]

  if (password && password.length < 5) return [{ message: 'Слишком короткий пароль' }, null]

  try {
    if (login) {
      const userWithSameLogin = await this.findOne({ login })

      if (userWithSameLogin) return [{ message: 'Пользователь с таким логином уже существует' }, null]
    }

    const updatingUser = await this.findOne({ _id: id })

    if (login) {
      updatingUser.login = login
    }

    if (password) {
      updatingUser.encryptedPassword = await bcrypt.hash(password, 10)
    }

    if (role) {
      updatingUser.role = role
    }

    await updatingUser.save()

    return [null, updatingUser]
  } catch (err) {
    logger.error(err.message)

    return [err, null]
  }
}
