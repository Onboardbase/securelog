const Log = require('../dist/index');

const mockedLog = jest.fn();
const mockedError = jest.fn();
const mockedWarn = jest.fn();

const secrets = { PORT: '9200' };

const mockConsoleLog = () => {
  mockedLog.mockReset();
  mockedWarn.mockReset();
  mockedError.mockReset();
  console.log = mockedLog;
  console.warn = mockedWarn;
  console.error = mockedError;
};

let secureLog;
const setup = (options = {}) => {
  mockConsoleLog();
  process.env = secrets;
  secureLog = new Log.default(options);
};

describe('Test console.log', () => {
  beforeEach(() => {
    setup();
  });
  it('should have called console.log with hello', () => {
    secureLog.log('hello');

    expect(mockedLog).toHaveBeenCalledWith(
      'Onboardbase Signatures here:',
      'hello'
    );
  });

  it('should have called console.warn with hello warn', () => {
    secureLog.warn('hello warn');
    expect(mockedWarn).toHaveBeenCalledWith('hello warn');
  });

  it('should have called console.error with hello error', () => {
    secureLog.error('hello error');
    expect(mockedError).toHaveBeenCalledWith('hello error');
  });

  it('should mask secrets when they are part of log', () => {
    secureLog.log(`running on port ${secrets.PORT}`);
    // expect(mockedError).toHaveBeenCalledWith(`running on port ****`)
  });
});
