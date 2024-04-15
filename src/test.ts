import SecureLog, { createSecureConsolaReporter } from './index';

const secrets = { PORT: '9200', NODE_ENV: 'development' };

process.env = secrets;

const secureLog = new SecureLog();

secureLog.log('hello 9200');

console.log('error development');

const consola = createSecureConsolaReporter();
consola.log('Hello');
