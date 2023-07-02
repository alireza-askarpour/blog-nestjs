const configs = {
  port: Number(process.env.PORT) || 3000,
  NODE_ENV: String(process.env.NODE_ENV),
  MONGO_URI: String(process.env.MONGO_URI),
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRES: String(process.env.JWT_EXPIRES),
}

export default () => configs
export type ConfigsType = typeof configs
