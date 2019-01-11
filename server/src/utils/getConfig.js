export default () => {
  if (process.env.NODE_ENV === 'development')
    return {
      dbName: process.env.DEV_DB_NAME,
      admin: {
        login: process.env.DEV_ADMIN_LOGIN,
        password: process.env.DEV_ADMIN_PASS,
      },
      editor: {
        login: process.env.DEV_EDITOR_LOGIN,
        password: process.env.DEV_EDITOR_PASS,
      },
      port: process.env.DEV_PORT,
    }

  if (process.env.NODE_ENV === 'testing')
    return {
      dbName: process.env.TEST_DB_NAME,
      admin: {
        login: process.env.TEST_ADMIN_LOGIN,
        password: process.env.TEST_ADMIN_PASS,
      },
      editor: {
        login: process.env.TEST_EDITOR_LOGIN,
        password: process.env.TEST_EDITOR_PASS,
      },
      port: process.env.TEST_PORT,
    }

  return {
    dbName: process.env.DB_NAME,
    admin: {
      login: process.env.ADMIN_LOGIN,
      password: process.env.ADMIN_PASS,
    },
    editor: {
      login: process.env.EDITOR_LOGIN,
      password: process.env.EDITOR_PASS,
    },
    port: process.env.PORT,
  }
}
