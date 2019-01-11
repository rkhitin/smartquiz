import { Schema, model } from 'mongoose'

import { usersRoles } from './constants'
import { verifyPassword, encryptPasswordAndCreateUser, updateUser } from './services'

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  encryptedPassword: { type: String, required: true },
  role: { type: String, required: true, enum: Object.keys(usersRoles) },
})

// Instance methods
userSchema.method('verifyPassword', verifyPassword)

// Statics methods
userSchema.statics.encryptPasswordAndCreateUser = encryptPasswordAndCreateUser
userSchema.statics.updateUser = updateUser

const User = model('User', userSchema)

export default User
