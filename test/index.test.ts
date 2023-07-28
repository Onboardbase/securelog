const Log = require('../dist');

describe('blah', () => {
  let secureLog;
  const setup = (options = {}) => {
    secureLog = new Log.default(options);
  };
  beforeAll(() => {
    setup();
    secureLog.log('hello');
  });
  it('works', () => {
    expect(1 + 1).toEqual(2);
  });
});
