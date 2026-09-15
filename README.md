# RST Store

## Database setup

The backend uses MySQL with Sequelize. Copy `.env.example` to `.env`, fill in
the `DB_*` variables, and create the configured MySQL database before starting
the server. Sequelize creates the application tables automatically on startup.

### Managed MySQL / Aiven

Set `DB_URI` to the service URI supplied by your database provider. For a TLS
connection, also set `DB_SSL_CA` to the provider's CA certificate. If the
certificate is pasted into an environment-variable form, use literal `\\n`
characters in place of line breaks. The application uses this certificate to
verify the database server.

Use `npm run data:import` to reset and seed the demo catalogue, or
`npm run data:destroy` to remove all application data.
