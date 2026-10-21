import { createClient } from '@vercel/postgres';
import { readFileSync } from 'node:fs';

const schema = readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8');

const client = createClient();
await client.connect();
await client.query(schema);
await client.end();

console.log('Database initialized: tables created and teams/friends seeded.');
