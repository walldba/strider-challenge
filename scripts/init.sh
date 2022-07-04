#!/bin/sh
echo "Starting typeorm migrations"
npm run typeorm migration:run
echo "Migrations has finished"

echo "Starting database seed script"
npm run seed
echo "Database seed script has finished"

npm start