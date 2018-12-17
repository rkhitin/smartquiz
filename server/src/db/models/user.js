import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
})

userSchema.method('verifyPassword', async function(password) {
  try {
    const res = await bcrypt.compare(password, this.password)

    return res
  } catch (_) {
    return false
  }
})

const User = model('User', userSchema)

export default User
