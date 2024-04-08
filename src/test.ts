import SecureLog, { createConsolaExporter } from './index';

const secrets = { PORT: '9200', NODE_ENV: 'development' };

process.env = secrets;

const secureLog = new SecureLog();

const consola = createConsolaExporter();
consola.log('Hello');

secureLog.log('hello 9200');

console.log('error development');
