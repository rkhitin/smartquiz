import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { usersRoles } from '../contants'

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: Object.keys(usersRoles) },
})

userSchema.method('verifyPassword', async function(password) {
  try {
    const res = await bcrypt.compare(password, this.password)

    return res
  } catch (_) {
    return false
  }
})

userSchema.statics.checkLoginExistence = async function(login) {
  try {
    const res = await this.find({ login })

    return res.length > 0
  } catch (_) {
    return false
  }
}

const User = model('User', userSchema)

export default User
