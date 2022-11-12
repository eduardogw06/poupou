module.exports = {
  type: "postgres",
  synchronize: false,
  url: process.env.DATABASE_URL,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  extra: process.env.DATABASE_OPTIONS_EXTRA,
};
