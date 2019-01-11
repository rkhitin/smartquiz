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
