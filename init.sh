#!/bin/sh
echo "Run typeorm migrations"
npm run typeorm migration:run
echo "Finish migrations"
npm start