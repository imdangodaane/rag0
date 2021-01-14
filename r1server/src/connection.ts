import { ConnectionOptions, createConnection } from 'typeorm';

export const createDBConnection = async (connectionOptions: ConnectionOptions) => {
  process.stdout.write(`[${new Date().toLocaleString()}]\t[Database connection] creating... (${connectionOptions.type}) `);

  const connection = await createConnection(connectionOptions);
  console.log('\x1b[32mcreated\x1b[0m.');

  return connection;
};
