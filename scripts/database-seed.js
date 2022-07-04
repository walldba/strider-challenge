const { Client } = require('pg');

const connectionOpts = {
  host: process.env.HOST || 'postgres',
  port: +process.env.PORT || 5432,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DATABASE || 'strider-challenge',
};
const client = new Client(connectionOpts);

async function generateUsers() {
  await client.query(
    `INSERT INTO users (id, created_at, username) 
    VALUES(uuid_generate_v4(), 'now'::text::timestamp(0) with time zone, 'Wallace90');
  
    INSERT INTO users (id, created_at, username) 
    VALUES(uuid_generate_v4(), 'now'::text::timestamp(0) with time zone, 'Zuckerberg84');
  
    INSERT INTO users (id, created_at, username) 
    VALUES(uuid_generate_v4(), 'now'::text::timestamp(0) with time zone, 'Musk71');
  
    INSERT INTO users (id, created_at, username) 
    VALUES(uuid_generate_v4(), 'now'::text::timestamp(0) with time zone, 'Strider22');
  `,
  );

  console.log(`Users were inserted`);
}

async function main() {
  console.log('Starting script to generate Users');

  try {
    await client.connect();

    await generateUsers();
  } finally {
    try {
      await client.end();
    } catch (e) {}
  }
}

main().catch(console.error);
