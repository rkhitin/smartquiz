import { User } from '../models'

export default async users => {
  await User.deleteMany({})

  users.forEach(async user => {
    await User.create(user)
  })
}
