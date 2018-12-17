import passport from 'passport'
import LocalStrategy from 'passport-local'

import { User } from '../db/models'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec()

    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
})

passport.use(
  new LocalStrategy(async (login, password, done) => {
    try {
      const user = await User.findOne({ login })

      const isPasswordCorrect = await user.verifyPassword(password)

      if (!isPasswordCorrect) return done(null, false)

      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  })
)

export default passport
