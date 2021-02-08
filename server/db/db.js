const Sequelize = require('sequelize')
const pkg = require('../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// SSL can only be used in production environment
// in this case NODE_ENV is undefined, to check this variable in production
// run the following command 'echo $NODE_ENV', it should return 'production'
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
    operatorsAliases: false,
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: process.env.DB_ENABLE_SSL,
    dialectOptions: {
      ssl: process.env.DB_ENABLE_SSL && {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
