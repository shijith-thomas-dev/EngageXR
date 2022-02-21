module.exports = {
  HOST: "localhost",
  USER: "engagexr",
  PASSWORD: "engagexr",
  DB: "EngageXR",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};