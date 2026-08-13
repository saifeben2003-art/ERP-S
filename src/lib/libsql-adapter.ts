import { createClient, type Client } from '@libsql/client';

interface LibsqlAdapter {
  adapterName: string;
  provider: string;
  connect(url: string): Promise<void>;
  disconnect(): Promise<void>;
  query(query: string, params: any[]): Promise<any>;
}

function isSqliteError(obj: any): obj is { code: string } {
  return typeof obj === 'object' && obj !== null && typeof obj.code === 'string';
}

export class LibsqlPrismaAdapter implements LibsqlAdapter {
  adapterName = 'libsql';
  provider = 'sqlite';
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async connect(_url?: string): Promise<void> {
    // Client is already connected via createClient
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  async query(query: string, params: any[]): Promise<any> {
    const stmts = this.client.prepare(query);
    try {
      let results: any;
      for (const stmt of stmts) {
        results = await stmt.bind(...params).run();
      }
      return results;
    } catch (e) {
      if (isSqliteError(e)) {
        const code = e.code;
        if (code === 'SQLITE_CONSTRAINT_UNIQUE') {
          throw new Error('Unique constraint violation');
        }
        if (code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
          throw new Error('Foreign key constraint violation');
        }
      }
      throw e;
    } finally {
      // Libsql auto-finalizes, but let's be safe
  }
  }
}
