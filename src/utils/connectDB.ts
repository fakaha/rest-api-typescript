import CONFIG from '../config/environment'
import { logger } from './logger'
const pgp = require('pg-promise')(/* options */)
const db = pgp(CONFIG.db)

db.one('select now()')
  .then(() => logger.info('Connected to DB successfully'))
  .catch((err: Error) => logger.error(`DB connection failed: ${err.message}`))

export default db
