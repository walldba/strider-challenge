import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export default registerAs<DatabaseConfig>('database', () => ({
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: +process.env.PORT || 5432,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DATABASE || 'strider-challenge',
}));
