import { Pool } from 'pg';
import { configENV } from './env';


// Create a new pool instance with the connection string from the environment variables
const db_pool = new Pool({
  connectionString: configENV.db,
});



// Handle errors on the pool
db_pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const query = (text: string, params?: any[]) => db_pool.query(text, params);
export { db_pool };