import IOptions from './interfaces/options.interface';

const isBrowser = () => {
  try {
    return window && window?.navigator && !global.process;
  } catch (error) {
    return false;
  }
};

const getGlobalConsoleObject = () => {
  return isBrowser() ? window.console : global.console;
};

const getGlobalObject = () => {
  return isBrowser() ? window : global;
};

const LOG_PREFIX = 'Onboardbase Signatures here:';

const checkForStringOccurences = (value: string) => {
  const projectSecrets = process.env || {};
  const secretValues = Object.values(projectSecrets);

  if (value) {
    if (secretValues.includes(value)) {
      console.error(
        `${value} is a valid secret for the key: ${Object.keys(
          projectSecrets
        ).find(key => projectSecrets[key] === value)}`,
        { skipValidationCheck: true }
      );
    }
    else if (secretValues.some(secret => value.includes(secret))) {
      console.error(`${value} contains some secret value`, { skipValidationCheck: true });
    }
  }
};

const isString = (value: any) => typeof value === 'string';
const isObject = (value: any) => Object.keys(value).length;
const isArray = (value: any) => Array.isArray(value);

const checkForPotentialSecrets = (args: any[]) => {
  try {
    args.map((argument: any) => {
      if (isString(argument)) {
        checkForStringOccurences(argument);
      }

      if (isObject(argument)) {
        const objectValue = Object.values(argument);
        checkForPotentialSecrets(objectValue);
      }

      if (isArray(argument)) {
        argument.map((arrayValue: any) => {
          if (isString(arrayValue)) {
            checkForPotentialSecrets(arrayValue);
          }

          if (isObject(arrayValue)) {
            checkForPotentialSecrets(Object.values(arrayValue));
          }

          if (isArray(arrayValue)) {
            checkForPotentialSecrets(arrayValue);
          }
        });
      }
    });
  } catch (error) {
    console.error(error, { skipValidationCheck: true });
  }
};

class SecureLog {
  cachedLog: Console;
  options: IOptions;

  constructor(options?: IOptions) {
    this.options = options;
    if (
      options &&
      options?.disableOn &&
      process.env.NODE_ENV === options?.disableOn
    )
      return;

    const globalObject: any = getGlobalObject();
    if (globalObject.obbinitialized) {
      return globalObject.console as SecureLog;
    }
    this.cachedLog = getGlobalConsoleObject();
    globalObject.console = this;
    globalObject.obbinitialized = true;
  }

  log(...args: any) {
    const disableConsole =
      this.options &&
      this.options.disableConsoleOn &&
      process.env.NODE_ENV === this.options?.disableConsoleOn;

    if (disableConsole) return;
    else {
      if (!isBrowser()) {
      }
      checkForPotentialSecrets(args);
      this.cachedLog.log.apply(console, [LOG_PREFIX, ...args]);
    }
  }

  clear() {
    // do whatever here with the passed parameters
    this.cachedLog.clear.apply(null);
  }

  assert(...args: any) {
    // do whatever here with the passed parameters
    this.cachedLog.log(
      "Normally, this shouldn't be logged, but yeah, it is now being logged."
    );
    this.cachedLog.assert.apply(null, args);
  }

  count(label?: string): void;
  count(label?: string): void;
  count(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  countReset(label?: string): void;
  countReset(label?: string): void;
  countReset(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  debug(...data: any[]): void;
  debug(message?: any, ...optionalParams: any[]): void;
  debug(...args: any): void {
    const disableConsole =
      this.options &&
      this.options.disableConsoleOn &&
      process.env.NODE_ENV === this.options?.disableConsoleOn;

    if (disableConsole) return;
    else {
      checkForPotentialSecrets(args);
      this.cachedLog.debug.apply(console, [LOG_PREFIX, ...args]);
    }
  }
  dir(item?: any, options?: any): void;
  dir(obj: any): void;
  dir(obj?: unknown, options?: unknown): void {
    throw new Error('Method not implemented.');
  }
  dirxml(...data: any[]): void;
  dirxml(...data: any[]): void;
  dirxml(...data: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  error(...data: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  error(...args: any): void {
    const modArgs = args || [];
    const disableConsole =
      this.options &&
      this.options.disableConsoleOn &&
      process.env.NODE_ENV === this.options?.disableConsoleOn;

    if (disableConsole) return;
    else {
      if (!modArgs[1]?.skipValidationCheck) {
        checkForPotentialSecrets(modArgs);
      }

      const logValue = modArgs[1]?.skipValidationCheck
        ? [LOG_PREFIX, modArgs[0]]
        : [LOG_PREFIX, ...modArgs];

      this.cachedLog.error.apply(console, logValue);
    }
  }
  group(...data: any[]): void;
  group(...label: any[]): void;
  group(...label: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  groupCollapsed(...data: any[]): void;
  groupCollapsed(...label: any[]): void;
  groupCollapsed(...label: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  groupEnd(): void;
  groupEnd(): void;
  groupEnd(): void {
    throw new Error('Method not implemented.');
  }
  info(...data: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  info(...args: any): void {
    const disableConsole =
      this.options &&
      this.options.disableConsoleOn &&
      process.env.NODE_ENV === this.options?.disableConsoleOn;

    if (disableConsole) return;
    else {
      checkForPotentialSecrets(args);
      this.cachedLog.info.apply(console, [LOG_PREFIX, ...args]);
    }
  }
  table(tabularData?: any, properties?: string[]): void;
  table(tabularData: any, properties?: readonly string[]): void;
  table(...args: any): void {
    throw new Error('Method not implemented.');
  }
  time(label?: string): void;
  time(label?: string): void;
  time(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  timeEnd(label?: string): void;
  timeEnd(label?: string): void;
  timeEnd(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  timeLog(label?: string, ...data: any[]): void;
  timeLog(label?: string, ...data: any[]): void;
  timeLog(label?: unknown, ...data: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  timeStamp(label?: string): void;
  timeStamp(label?: string): void;
  timeStamp(label?: unknown): void {
    throw new Error('Method not implemented.');
  }
  trace(...data: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  trace(message?: unknown, ...optionalParams: unknown[]): void {
    throw new Error('Method not implemented.');
  }
  warn(...data: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  warn(...args: any): void {
    const disableConsole =
      this.options &&
      this.options.disableConsoleOn &&
      process.env.NODE_ENV === this.options?.disableConsoleOn;

    if (disableConsole) return;
    else {
      if (!args[1].skipValidationCheck) {
        checkForPotentialSecrets(args);
      }

      const logValue = args[1].skipValidationCheck
        ? ['Warning:', args[0]]
        : [LOG_PREFIX, ...args];

      this.cachedLog.warn.apply(console, logValue);
    }
  }
  Console: console.ConsoleConstructor;
  profile(label?: string): void {
    return this.cachedLog.profile(label);
  }
  profileEnd(label?: string): void {
    return this.cachedLog.profileEnd.bind(null, label);
  }
}

export default SecureLog;
