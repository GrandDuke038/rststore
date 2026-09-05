# RST Store

## Database setup

The backend uses MySQL with Sequelize. Copy `.env.example` to `.env`, fill in
the `DB_*` variables, and create the configured MySQL database before starting
the server. Sequelize creates the application tables automatically on startup.

Use `npm run data:import` to reset and seed the demo catalogue, or
`npm run data:destroy` to remove all application data.
