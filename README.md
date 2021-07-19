```bash
# Develop in watch mode
$ yarn start:dev

# Debug in watch mode
$ yarn start:debug

# Start local database
$ yarn docker:local:db:up

# Stop local database
$ yarn docker:local:db:down

# Generate migrations from changes in code
$ yarn typeorm:migrations:generate

# Run migrations
$ yarn typeorm:migrations:run

# Drop schema
$ yarn typeorm:schema:drop

# Sync schema from code (might cause dataloss)
$ yarn typeorm:schema:sync

# Log config
$ yarn typeorm:seed:config

# Run seeds
$ yarn typeorm:seed:run

```
