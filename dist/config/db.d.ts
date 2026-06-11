import { Pool } from 'pg';
declare const db_pool: Pool;
export declare const query: (text: string, params?: any[]) => Promise<import("pg").QueryResult<any>>;
export { db_pool };
//# sourceMappingURL=db.d.ts.map