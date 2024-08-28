const SecureLog = require('./dist');

// mask secrets existing in a predefined value
// console.log(SecureLog.maskSecretLeaks('asd 9200 asd development', ['asd']));

const secrets = { PORT: '9200', NODE_ENV: 'development' };

process.env = secrets;
// mask secrets in process.env
// console.log(SecureLog.maskSecretLeaks('asd 9200 asd development'));
// console.log(
//   SecureLog.maskSecretLeaks({
//     key: ['asd 9200 asd development'],
//   })
// );

// console.log(SecureLog.maskSecretLeaks(['asd 9200 asd development']));

// console.log(
//   SecureLog.maskSecretLeaks({
//     nested: { env: 'development' },
//   })
// );

const secureLog = new SecureLog.default();

secureLog.log('hello 9200');

console.log({ v: 'k', test: { null: null } });

// const consola = SecureLog.createSecureConsolaReporter({});
// consola.log('hello there development');

// console.log(secureLog.hasSecretLeak('Hey'));
